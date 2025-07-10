import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import Header from "../components/common/StoneHeader";
import Nav from "../components/common/StoneNav";
import DashTotalInfo from "../components/info/StoneDashTotalInfo";
import DashAreaInfo from "../components/info/DashAreaInfo";
import DashSoleInfo from "../components/info/StoneDashSoleInfo";
import charticon from "../public/images/chart_icon.png";
import nexticon from "../public/images/next.png";
import previcon from "../public/images/prev.png";

import DoughnutChart from "../components/charts/dashDoughnutChart";
import LineChart from "../components/charts/dashLineChart";
import BarChart from "../components/charts/dashBarChart";

import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import { LOAD_ZONELISTS_REQUEST, LOAD_SCANNERLISTS_REQUEST, LOAD_ZONELISTS_STONE_REQUEST, LOAD_SCANNERLISTS_STONE_REQUEST } from "../reducers/scanner";
import { LOAD_ZONESECTION_REQUEST } from "../reducers/scanner";
import wrapper from "../store/configureStore";
import Script from "next/script";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Mapp = styled.div`
  background-color: #1b2137;
  margin-top: 100px;
  width: 100%;
  height: 820px;
  .map {
    width: 100%;
    height: 820px;
  }
  .overlaybtn {
    //z-index: 1;
    position: absolute;
    top: 120px;
    left: 465px;
    display: grid;
  }
  .buttons {
    display: grid;
  }

  .button {
    border-radius: 10px;
    border: 0;
    padding: 5px 25px;
    margin: 4px;
    //margin : 7px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 11pt;
    color: white;
  }

  .blue {
    background: rgba(0, 112, 192, 0.3);
  }
  .br {
    background: rgba(172, 145, 115, 0.3);
  }
  .gr {
    background: rgba(7, 154, 62, 0.3);
  }
  .or {
    background: rgba(235, 97, 0, 0.3);
  }
  .pu {
    background: rgba(112, 0, 236, 0.3);
  }
  .yl {
    background: rgba(242, 236, 0, 0.4);
  }
  .red {
    background: rgba(236, 0, 0, 0.3);
  }

  .button:active {
    top: 20px;
    box-shadow: 0 0 gray;
    background: rgba(168, 179, 202, 0.8);
  }

  .button:active {
    top: 20px;
    box-shadow: 0 0 gray;
    background: rgba(168, 179, 202, 0.8);
  }

  .tourOn {
    border-radius: 10px;
    border: 0;
    //background: linear-gradient(to right, #75A6FC, #75A6FC, rgba(255,255,255,0.3));
    background: rgba(117, 166, 252, 1);
    box-shadow: 0px 4px 0px rgba(168, 179, 202, 1);
    margin: 3px;
    display: inline-block;
    color: white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 3px;
    width: 85px;
    text-align: center;
  }

  .tourOff {
    border-radius: 10px;
    border: 0;
    background: rgba(168, 179, 202, 1);
    box-shadow: inset 4px 4px rgba(140, 140, 140, 0.8);
    margin: 3px;
    display: inline-block;
    color: white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 3px;
    width: 85px;
    text-align: center;
  }

  .scanner {
    background: linear-gradient(to right, #75a6fc, #f2d9d8);
    color: white;
    font-weight: bolder;
    font-size: 15pt;
    padding: 6px;
    width: 90px;
  }

  .arrowbtnprev {
    position: absolute;
    top: 50%;
    //right: 10px;
    left: 455px;
    display: grid;
  }
  .arrowbtnnext {
    position: absolute;
    top: 50%;
    //right: 10px;
    right: 435px;
    display: grid;
  }
  .prev {
    //width:50%;
    heigth: 5px;
  }
`;

const Background = styled.div`
  height: 820px;
  .iframeBox {
    position: relative;
    width: 100%;
    height: 820px;
  }
  .iframe {
    width: 100%;
    height: 100%;
  }
  .overlayleft {
    top: 110px;
    position: absolute;
    display: grid;
    grid-template-columns: 5fr 1fr;
    width: 50px;
    height: 820px;
    //z-index:1;
  }
  .overlaydash {
    width: 450px;
    height: 820px;
    background: rgba(255, 255, 255, 0.7);
    transform: translate(0px, 0px);
    transition-duration: 0.5s;
    //z-index:1;
  }

  .trans {
    transform: translate(-500px, 0px);
    transition-duration: 0.5s;
  }

  .reverse {
    transform: scaleX(-1) translate(500px, 0px);
  }

  .column {
    width: 95%;
    margin: 5px 2.5% 5px 2.5%;
    display: grid;
    text-align: center;
    grid-template-columns: 2.2fr 1fr 1fr 1fr;
    font-weight: bold;
  }

  .overlayright {
    position: absolute;
    top: 110px;
    right: 0;
    display: grid;
    width: 430px;
    height: 820px;
    background: rgba(255, 255, 255, 0.8);
    //z-index:1;
    //text-align: center;
  }

  .overlaychart {
    width: 80%;
    height: 820px;
    margin-left: 12%;
  }

  .chart {
    height: 150px;
  }

  .chartd {
    width: 80%;
    margin-left: 10%;
  }

  .charttitle {
    font-weight: bold;
    font-size: 11pt;
    color: black;
    margin-bottom: 15px;
    margin-left: -20px;
  }

  .darkback {
    .overlay {
      background: rgba(146, 155, 180, 0.4);
    }
  }

  .scannerbtn {
    margin: 30px;
  }
  .zoneleft {
    margin: 0;
    margin-left: 11px;
  }

  .zone {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border: 0;
    display: inline-block;
    color: white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 2px;
    width: 137.5px;
    margin: 1px 1px 0 1px;
    text-align: center;
  }

  .zoneSelct {
    //background: rgba(117,166,252,1);
    background-color: rgb(0, 0, 0);
  }

  .zoneNotSelct {
    // top: 20px;
    //box-shadow:inset 4px 4px rgba(140,140,140,0.8);
    background: rgba(168, 179, 202, 1);
  }

  .total2 {
    margin-bottom: 0;
  }

  .infotitle {
    //margin-left: 197px;
    margin-top: 5px;
    font-weight: bolder;
    font-size: 13.5pt;
    color: #303030;
    text-align: center;
  }
`;

const Dash = () => {
  const dispatch = useDispatch();
  const { me, lastMonday, lastSunday, today, ago7day, yesterday } = useSelector((state) => state.auth);
  const { zonedatas, scanners, zonedatasStone, scannersStone } = useSelector((state) => state.scanner);
  const scanDevice = scannersStone;
  const zoneData = zonedatasStone;

  const zones = ["벚꽃놀이터", "FnB", "프리마켓", "친환경 쉼터", "라이트쇼"];

  const scanDevices = JSON.parse(JSON.stringify(scanDevice)); //json 깊은 복사

  var tourTimer;

  const [zoneSection, setZoneSection] = useState("경주돌담길 전체");
  const [onchangeZone, setOnChangeZone] = useState(false);
  const [tours, setTours] = useState(0);

  var tourCnt = 0;

  const Map = () => {
    const [onOffZone, setOnOffZone] = useState(false);
    const [onOffScanner, setOnOffScanner] = useState(false);
    const [onOffBound, setOnOffBound] = useState(false);

    //방문객 수 황리단길
    const [visitor11, setVisitor11] = useState(0);
    const [visitor12, setVisitor12] = useState(0);
    const [visitor13, setVisitor13] = useState(0);
    const [visitor14, setVisitor14] = useState(0);
    const [visitor15, setVisitor15] = useState(0);
    const [visitor16, setVisitor16] = useState(0);

    const [visitorStone, setVisitorStone] = useState(0);

    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    //오늘 방문객 데이터 가져오기
    const getAPIdata = async () => {
      console.log("방문객데이터가져오기");

      /**
       * 오늘자 방문객 그래프
       */
      try {
        const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);

        //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);

        let arrY = [0, 0, 0, 0, 0, 0];

        for (let i of responseToday.data) {
          for (let j = 0; j < zones.length; j++) {
            if (i.zone_id === zones[j]) {
              arrY[j] = i.data;
              break;
            }
          }
        }

        setVisitor11(arrY[0]);
        setVisitor12(arrY[1]);
        setVisitor13(arrY[2]);
        setVisitor14(arrY[3]);
        setVisitor15(arrY[4]);
        setVisitor16(arrY[5]);
        setVisitorStone(arrY[6]);
      } catch (err) {
        console.error(err);
      }
    };

    //장비데이터 가져오기(map)
    const getDeviceStatus2 = async () => {
      console.log("디바이스가져오기");

      //스캐너 정보저장
      const ScannerStatus = (scannerInfo) => {
        return ` 
          <br/>[장비정보] <br/>
          MAC : ${scannerInfo["mac"]} <br/>
          INTMAC : ${scannerInfo["intmac"]} <br/>
          장비타입 : ${scannerInfo["type"]}<br/>
          상태 : ${scannerInfo["status"]}`;
      };

      for (var j of scanDevices) {
        j.info = ScannerStatus(j);
      }

      try {
        //장비정보가져오기API
        //const deviceResponse = await axios.get(`http://54.180.158.22:8000/v1/DaeguDalseong/DeviceStatus`);
        const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
        const resultData = deviceResponse.data;

        for (let i of resultData) {
          for (var j of scanDevices) {
            if (j.mac == i.MAC) {
              if (i.ALIVE === 1) {
                j.status = "ON";
              } else if (i.ALIVE === 0) {
                j.status = "OFF";
              }
            }
            j.info = ScannerStatus(j);
          }
        }
        //mapConfig();
      } catch (err) {
        console.error(err);
      }
    };

    /**
 * 지도설정

 */
    //지도에 맵 올리기
    const mapConfig = (zonePos, onScanner, onBound, selectZoom) => {
      console.log("맵 올리기");
      getAPIdata();
      getDeviceStatus2();

      var locationss = [sessionStorage.getItem("lat"), sessionStorage.getItem("lon")];

      var zoom = Number(sessionStorage.getItem("zoom"));

      //var zone = new naver.maps.LatLng(locationss[0],locationss[1]);
      var zone = new naver.maps.LatLng(35.83781672432809, 129.21360023190363);

      if (!locationss[0]) {
        var zone = new naver.maps.LatLng(35.83781672432809, 129.21360023190363);
        zoom = 19;
      }

      if (zonePos) {
        var zone = zonePos;
        zoom = selectZoom;
      }

      //맵 설정
      var map1 = new naver.maps.Map("map1", {
        center: zone,
        zoom: zoom,
      });

      //줌레벨 저장
      naver.maps.Event.addListener(map1, "zoom_changed", function (zoom) {
        sessionStorage.setItem("zoom", zoom);
      });

      // 위치정보 저장
      naver.maps.Event.addListener(map1, "bounds_changed", function (bounds) {
        var a = map1.getCenter();
        sessionStorage.setItem("lat", a.y);
        sessionStorage.setItem("lon", a.x);
      });

      var markers = [];
      var infowindows = [];

      var HOME_PATH = window.HOME_PATH || ".";

      /**
       * 다각형표시
       */
      if (!onBound) {
        var polygon1 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.84030532350763, 129.2133782823704),
              new naver.maps.LatLng(35.84043490520969, 129.21382515258083),
              new naver.maps.LatLng(35.84028490520969, 129.2137315258083),
              new naver.maps.LatLng(35.83954575206978, 129.21377554864182),
              new naver.maps.LatLng(35.83957183372683, 129.21358261959261),
              new naver.maps.LatLng(35.84013183372683, 129.21355261959261),
            ],
          ],
          fillColor: "red",
          fillOpacity: 0.3,
          strokeColor: "red",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });

        //황리단길 중심1
        var polygon2 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.83957183372683, 129.21358261959261),
              new naver.maps.LatLng(35.83954575206978, 129.21377554864182),
              new naver.maps.LatLng(35.8381345044748, 129.21383591210775),
              new naver.maps.LatLng(35.83812517423062, 129.21363880498008),
            ],
          ],
          fillColor: "orange",
          fillOpacity: 0.3,
          strokeColor: "orange",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });

        //황리단길 북동
        var polygon3 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.83812517423062, 129.21363880498008),
              new naver.maps.LatLng(35.8381345044748, 129.21383591210775),
              new naver.maps.LatLng(35.8380345044748, 129.21384591210775),
              new naver.maps.LatLng(35.837781671584714, 129.21392103204435),
              new naver.maps.LatLng(35.837221671584714, 129.21420103204435),
              new naver.maps.LatLng(35.83717631865474, 129.2140230261333),
              new naver.maps.LatLng(35.83757631865474, 129.2138130261333),
              new naver.maps.LatLng(35.83797631865474, 129.2136630261333),
            ],
          ],
          fillColor: "green",
          fillOpacity: 0.3,
          strokeColor: "green",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });

        //황리단길 동
        var polygon4 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.83717631865474, 129.2140230261333),
              new naver.maps.LatLng(35.837221671584714, 129.21420103204435),
              new naver.maps.LatLng(35.83699824764853, 129.21430779738875),
              new naver.maps.LatLng(35.83669824764853, 129.21449779738875),
              new naver.maps.LatLng(35.83645824764853, 129.21469779738875),
              new naver.maps.LatLng(35.83621174398843, 129.21499520263916),
              new naver.maps.LatLng(35.8360746007862, 129.21491560323577),
              new naver.maps.LatLng(35.836283822424505, 129.21465076413837),
              new naver.maps.LatLng(35.836483822424505, 129.21445576413837),
              new naver.maps.LatLng(35.836783822424505, 129.21423076413837),
            ],
          ],
          fillColor: "blue",
          fillOpacity: 0.3,
          strokeColor: "blue",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });

        var polygon5 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.8360746007862, 129.21491560323577),
              new naver.maps.LatLng(35.83621174398843, 129.21499520263916),
              new naver.maps.LatLng(35.8361638060245, 129.21505349039943),
              new naver.maps.LatLng(35.83584038060245, 129.21565349039943),
              new naver.maps.LatLng(35.83564038060245, 129.21595349039943),
              new naver.maps.LatLng(35.83547917079785, 129.216130096306),
              new naver.maps.LatLng(35.83540416942607, 129.2159755826026),
              new naver.maps.LatLng(35.83548856160614, 129.21590105248642),
              new naver.maps.LatLng(35.83570856160614, 129.21559105248642),
            ],
          ],
          fillColor: "purple",
          fillOpacity: 0.3,
          strokeColor: "purple",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });
      }
      /**
       * 존 및 스캐너 마커표시
       */
      if (onScanner) {
        for (var i of zoneData) {
          if (i.zone === zones[0]) {
            var visitor = visitor11;
          } else if (i.zone === zones[1]) {
            var visitor = visitor12;
          } else if (i.zone === zones[2]) {
            var visitor = visitor13;
          } else if (i.zone === zones[3]) {
            var visitor = visitor14;
          } else if (i.zone === zones[4]) {
            var visitor = visitor15;
          } else if (i.zone === zones[5]) {
            var visitor = visitor16;
          }

          var marker = new naver.maps.Marker({
            map: map1,
            position: naver.maps.LatLng(i.lat, i.lon),
            title: i.zone,
            icon: {
              content: "<img src=" + HOME_PATH + "/images/marker_`" + i.boundcolor + ".png>",
              //content: '<img src='+HOME_PATH+'/images/scanner_icon_1.png>',
              //size: new naver.map.Size(50,50),
            },
          });

          //마커 누르면 나오는 정보
          var infowindow = new naver.maps.InfoWindow({
            content: '<div style="text-align:center; padding:10px; border-radius:5px; background:rgba(255,255,255,0.7); border:solid gray 0.5px;"><b>' + i.zone + " - " + visitor + "명</b></div>",
            //maxWidth: 140,
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(255,255,255,0)",
            anchorSize: new naver.maps.Size(0, 0),
            anchorSkew: false,
            anchorColor: "#fff",
            pixelOffset: new naver.maps.Point(0, 0),
          });

          markers.push(marker);
          infowindows.push(infowindow);
        }
      } else if (!onScanner) {
        // 스캐너 마커
        for (var i of scanDevices) {
          if (i.zone == zones[0]) {
            var color = "red";
          } else if (i.zone === zones[1]) {
            var color = "orange";
          } else if (i.zone === zones[2]) {
            var color = "green";
          } else if (i.zone === zones[3]) {
            var color = "blue";
          } else if (i.zone === zones[4]) {
            var color = "purple";
          } else {
            var color = "error";
          }

          //스캐너 아이콘 넣기
          if (i.status == "ON") {
            var marker = new naver.maps.Marker({
              map: map1,
              position: naver.maps.LatLng(i.lat, i.lon),
              title: i.zone + "-" + i.num,
              icon: {
                content: "<img src=" + HOME_PATH + "/images/scanner_" + color + ".png>",
                //url:HOME_PATH + "/images/scanner_" + color +  ".png",
                //size: new naver.map.Size(50,50),
              },
            });
          } else {
            var marker = new naver.maps.Marker({
              map: map1,
              position: naver.maps.LatLng(i.lat, i.lon),
              title: i.zone + "-" + i.num,
              icon: {
                content: "<img src=" + HOME_PATH + "/images/scanner_error.png>",
                //size: new naver.map.Size(50,50),
              },
            });
          }

          //마커 누르면 나오는 정보
          var infowindow = new naver.maps.InfoWindow({
            content: '<div style="text-align:left;padding:10px;border-radius:5px; background:rgba(255,255,255,0.7); border:solid gray 0.5px;"><b>' + i.zone + "</n>" + i.info + "</b></div>",
            //maxWidth: 140,
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(255,255,255,0)",
            anchorSize: new naver.maps.Size(0, 0),
            anchorSkew: false,
            anchorColor: "#fff",
            pixelOffset: new naver.maps.Point(0, 0),
          });

          markers.push(marker);
          infowindows.push(infowindow);
        }
      }

      for (let i = 0; i < markers.length; i++) {
        naver.maps.Event.addListener(markers[i], "click", function (e) {
          if (infowindows[i].getMap()) {
            infowindows[i].close();
          } else {
            infowindows[i].open(map1, markers[i]);
          }
        });
      }
      //infowindow.open(map1, marker1);

      //존이름 표시
      if (!onBound) {
        for (var i of zoneData) {
          var text = new naver.maps.Marker({
            map: map1,
            position: new naver.maps.LatLng(i.textlat, i.textlon),
            title: i.zonename,
            icon: {
              content: '<div style="text-align:center; font-size:13pt; color:' + i.boundcolor + '; font-weight:bolder; text-shadow:1px 1px 1px #000;">' + i.zonename + "</div>",
            },
          });
        }
      }
    };

    //스캐너버튼 클릭시
    const onClickScanner = () => {
      var scanner = !onOffScanner;
      setOnOffScanner(scanner);
      mapConfig(new naver.maps.LatLng(sessionStorage.getItem("lat"), sessionStorage.getItem("lon")), scanner, onOffBound, Number(sessionStorage.getItem("zoom")));
    };

    //존버튼 클릭시
    const onClickZones = () => {
      setOnOffZone(!onOffZone);
    };

    //바운드버튼 클릭시
    const onClickBound = () => {
      var bound = !onOffBound;
      setOnOffBound(!onOffBound);
      mapConfig(new naver.maps.LatLng(sessionStorage.getItem("lat"), sessionStorage.getItem("lon")), onOffScanner, bound, Number(sessionStorage.getItem("zoom")));
    };

    const zonePoss = (lat, lon, zoom) => {
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      sessionStorage.setItem("zoom", zoom);
      mapConfig(new naver.maps.LatLng(lat, lon), onOffScanner, onOffBound, zoom);
    };

    // const onClickZonePos1 = (e) => {
    //   //황리단 중심1
    //   zonePoss(35.837865076402906, 129.20975070742932, 18);
    // };
    // const onClickZonePos2 = (e) => {
    //   //황리단 중심2
    //   zonePoss(35.83641772664928, 129.20956946605287, 18);
    // };
    // const onClickZonePos3 = (e) => {
    //   //황리단 중심3
    //   zonePoss(35.833941723885346, 129.20946758606377, 18);
    // };
    // const onClickZonePos4 = (e) => {
    //   //황리 북동
    //   zonePoss(35.835981903795464, 129.21195304644826, 18);
    // };
    // const onClickZonePos5 = (e) => {
    //   // 황리 동남
    //   zonePoss(35.83380721693253, 129.21212502399376, 18);
    // };
    // const onClickZonePos6 = (e) => {
    //   //황리 동
    //   zonePoss(35.83483041104162, 129.21478697840539, 18);
    // };
    // const onClickZonePos7 = (e) => {
    //   //황리 서
    //   zonePoss(35.836666537099184, 129.20804378934835, 18);
    // };
    // const onClickZonePos8 = (e) => {
    //   //황리 서남
    //   zonePoss(35.83428349727689, 129.2082764896501, 18);
    // };
    // const onClickZonePos9 = (e) => {
    //   //불국사
    //   zonePoss(35.7862720928056, 129.32887704033146, 18);
    // };
    // const onClickZonePos10 = (e) => {
    //   //석굴암
    //   zonePoss(35.7897363584415, 129.34948654558244, 18);
    // };
    // const onClickZonePos11 = (e) => {
    //   //봉황대
    //   zonePoss(35.8418396128661, 129.21114087085098, 18);
    // };
    // const onClickZonePos12 = (e) => {
    //   //동궁과월지
    //   zonePoss(35.8333411100388, 129.2267456294713, 18);
    // };
    // const onClickZonePos13 = (e) => {
    //   //첨성대
    //   zonePoss(35.834732295, 129.21760174006871, 18);
    // };
    // const onClickZonePos14 = (e) => {
    //   //교촌마을
    //   zonePoss(35.8295354455455, 129.2147365822213, 18);
    // };
    // const onClickZonePos15 = (e) => {
    //   //터미널
    //   zonePoss(35.8387029950045, 129.20411377849393, 18);
    // };
    // const onClickZonePos16 = (e) => {
    //   //황리단길 전체
    //   zonePoss(35.836147565167735, 129.21115263378698, 17);
    // };
    // const onClickZonePos17 = (e) => {
    //   //대릉원
    //   zonePoss(35.8377193328448, 129.212773131131, 17);
    // };

    // const onClickZonePos18 = (e) => {
    //   //국립경주박물관
    //   zonePoss(35.830571880281866, 129.22836664799445, 17);
    // };
    // const onClickZonePos19 = (e) => {
    //   //연꽃 단지
    //   zonePoss(35.83578771701733, 129.2230822233194, 17);
    // };

    useEffect(() => {
      console.log("api 다시 받아오기");
      getAPIdata();
      getDeviceStatus2();
      setInterval(getAPIdata, 90000);

      setInterval(getDeviceStatus2, 180000);
    }, []);

    useEffect(() => {
      // API 새로 고침할때마다 지도 다시 그려줌
      mapConfig();
    }, [visitor11]);

    useEffect(() => {
      // 왼쪽 overlay 권역 클릭시 맵 위치 변경
      if (zoneSection == "황리단길 권역") {
        sessionStorage.setItem("lat", 35.836147565167735);
        sessionStorage.setItem("lon", 129.21115263378698);
        sessionStorage.setItem("zoom", 17);
        getDeviceStatus2();
        //mapConfig(new naver.maps.LatLng(35.836147565167735, 129.21115263378698), onOffScanner, onOffBound, 17);
        zonePoss(35.836147565167735, 129.21115263378698, 17);
      } else if (zoneSection == "동부사적지 권역") {
        zonePoss(35.834732295, 129.21760174006871, 17);
      } else if (zoneSection == "불국사 권역") {
        zonePoss(35.7862720928056, 129.32887704033146, 17);
      } else if (zoneSection == "경주 대릉원") {
        zonePoss(35.8377193328448, 129.212773131131, 17);
      }
    }, [zoneSection]);

    return (
      <>
        <Script type={"text/javascript"} src={"https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=t0gdynkrzk&submodules=visualization"} onReady={mapConfig}></Script>{" "}
        <Mapp>
          <div id="map1" className="map"></div>

          <div className="overlaybtn">
            <div>
              <button className={onOffScanner ? "tourOff" : "tourOn"} onClick={onClickScanner}>
                {" "}
                scanner
              </button>
              {/* <button className={onOffZone ? "tourOff" : "tourOn"} onClick={onClickZones}>
                {" "}
                zone
              </button> */}
              <button className={onOffBound ? "tourOff" : "tourOn"} onClick={onClickBound}>
                {" "}
                bound
              </button>
            </div>
            {/* {onOffZone ? (
              <div className="buttons">
                <button className="button red" onClick={onClickZonePos1}>
                  {" "}
                  1
                </button>
                <button className="button or" onClick={onClickZonePos2}>
                  {" "}
                  2
                </button>
                <button className="button yl" onClick={onClickZonePos3}>
                  {" "}
                  3
                </button>
                <button className="button yl" onClick={onClickZonePos3}>
                  {" "}
                  4
                </button>
                <button className="button yl" onClick={onClickZonePos3}>
                  {" "}
                  5
                </button>
                
              </div>
            ) : (
              ""
            )} */}
          </div>
        </Mapp>
      </>
    );
  };

  const Home = () => {
    const [allWeekInfoHD, setAllWeekInfoHD] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitHD, setLastWeekRevisitHD] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasHD, setTodayCurrentVisitorChartDatasHD] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    const [daylabelHD1, setDaylabelHD1] = useState([]);
    const [daylabelHD2, setDaylabelHD2] = useState([]);

    const pielabelHD = ["놀이터", "FnB", "마켓", "쉼터", "라이트쇼"];

    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    const getAPIdata1 = async () => {
      //지난주 방문객 추이

      try {
        const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=` + ago7day + "&to=" + today);

        var zone_allHD = [];
        var dayLabelHD = [];
        var dayVisitHD = [];

        for (let i of response1.data) {
          if (i.zone == "경주돌담길 전체") {
            dayVisitHD.push([i.data, i.time.slice(5, 10)]);
          }
        }

        dayVisitHD.sort((a, b) => new Date(a[1]) - new Date(b[1]));

        //중복제거 함수
        const samedelete = (arr) => {
          var data = []; //값
          var day = []; //날짜
          for (let i = 0; i < arr.length; i++) {
            if (day.includes(arr[i][1])) {
              continue;
            }
            data.push(arr[i]);
            day.push(arr[i][1]);
          }
          return data;

          //console.log('a',day, data)
        };

        var NdayVisitHD = samedelete(dayVisitHD);

        //console.log('NdayVisitDR',NdayVisitDR);

        for (let i = 0; i < NdayVisitHD.length; i++) {
          zone_allHD.push(NdayVisitHD[i][0]);
          dayLabelHD.push(NdayVisitHD[i][1]);
        }

        setAllWeekInfoHD(zone_allHD);
        setDaylabelHD1(dayLabelHD);
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          getAPIdata1();
        }, 2000);
      }
    };

    const getAPIdata2 = async () => {
      // 현재존별방문객비율

      try {
        const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly`);

        //const response3 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);

        //let resultList = [];
        var zoneDataHD = [0, 0, 0, 0, 0];

        for (let i of response3.data) {
          if (i.zone_id === zones[0]) {
            zoneDataHD[0] = i.data;
          } else if (i.zone_id === zones[1]) {
            zoneDataHD[1] = i.data;
          } else if (i.zone_id === zones[2]) {
            zoneDataHD[2] = i.data;
          } else if (i.zone_id === zones[3]) {
            zoneDataHD[3] = i.data;
          } else if (i.zone_id === zones[4]) {
            zoneDataHD[4] = i.data;
          } else if (i.zone_id === zones[5]) {
            zoneDataHD[5] = i.data;
          } else if (i.zone_id === zones[6]) {
            zoneDataHD[6] = i.data;
          } else if (i.zone_id === zones[7]) {
            zoneDataHD[7] = i.data;
          }
        }

        setTodayCurrentVisitorChartDatasHD(zoneDataHD);
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          getAPIdata2();
        }, 2000);
      }
    };

    const getAPIdata3 = async () => {
      // 지난주 재방문객 -> 시간별 방문객
      let hours = new Date().getHours();

      try {
        //const response4 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from=2021-10-01&to=2021-10-07`);
        const response4 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDayHour?from=` + today + "T07" + "&to=" + today + "T" + hours);
        //console.log(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDayHour?from=` + today + 'T07' + "&to=" + today + 'T' + hours);

        var day_allHD = [];
        var dayLabelsHD = [];
        var dayReVisitHD = [];

        for (let i of response4.data) {
          if (i.zone == "경주돌담길 전체") {
            dayReVisitHD.push([i.data, i.time.slice(11, 13)]);
          }
        }

        dayReVisitHD.sort((a, b) => new Date(a[1]) - new Date(b[1]));

        for (let i = 0; i < dayReVisitHD.length; i++) {
          day_allHD.push(dayReVisitHD[i][0]);
          dayLabelsHD.push(dayReVisitHD[i][1]);
        }

        setLastWeekRevisitHD(day_allHD);
        setDaylabelHD2(dayLabelsHD);
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          getAPIdata3();
        }, 2000);
      }
    };

    useEffect(() => {
      getAPIdata1();
      getAPIdata2();
      getAPIdata3();
      setInterval(getAPIdata1, 900000);
      setInterval(getAPIdata2, 900000);
      setInterval(getAPIdata3, 900000);
    }, []);

    return (
      <Background>
        <div className="lightback">
          <Header />
          <Nav value={"2"} />
          <div className="iframeBox">
            <Map className="iframe" zonesections={zoneSection} />
          </div>
          <div className="overlayleft">
            <div className="overlaydash">
              <div className="infotitle">대릉원 돌담길 전체</div>
              <DashTotalInfo theme={me ? me.theme : ""} zone={"경주돌담길 전체"} />
              <DashSoleInfo zone={zoneSection} scanners={scannersStone} zonedatas={zonedatasStone} />
            </div>
          </div>
          <div className="overlayright">
            <div className="overlaychart">
              <br />
              <div>
                <div className="charttitle">
                  <Image src={charticon} width={10} height={10} /> 돌담길 전체 방문객 추이{" "}
                </div>
                <BarChart className="chart" datas={allWeekInfoHD} daylabel={daylabelHD1} />
              </div>
              <br />
              <div>
                <div className="charttitle">
                  <Image src={charticon} width={10} height={10} /> 돌담길 전체 시간별 추이{" "}
                </div>
                <LineChart className="chart" datas={lastWeekRevisitHD} daylabel={daylabelHD2} />
              </div>
              <br />
              <div>
                <div className="charttitle">
                  <Image src={charticon} width={10} height={10} /> 돌담길 전체 실시간 방문객{" "}
                </div>
                <div className="chartd">
                  <DoughnutChart datas={todayCurrentVisitorChartDatasHD} label={pielabelHD} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Background>
    );
  };

  return <Home />;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  //쿠키 공유되는 문제 해결
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_ZONELISTS_REQUEST,
  });
  store.dispatch({
    type: LOAD_SCANNERLISTS_REQUEST,
  });
  store.dispatch({
    type: LOAD_ZONELISTS_STONE_REQUEST,
  });
  store.dispatch({
    type: LOAD_SCANNERLISTS_STONE_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default Dash;
//export default Map;
