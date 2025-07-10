import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import DashTotalInfo from "../components/info/DashTotalInfo";
import DashAreaInfo from "../components/info/DashAreaInfo";
import DashSoleInfo from "../components/info/DashSoleInfo";
import charticon from "../public/images/chart_icon.png";
import nexticon from "../public/images/next.png";
import previcon from "../public/images/prev.png";

import DoughnutChart from "../components/charts/dashDoughnutChart";
import LineChart from "../components/charts/dashLineChart";
import BarChart from "../components/charts/dashBarChart";

import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import { LOAD_ZONELISTS_REQUEST, LOAD_SCANNERLISTS_REQUEST } from "../reducers/scanner";
import wrapper from "../store/configureStore";
import Script from "next/script";
import styled, { withTheme } from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Mapp = styled.div`

  background-color: #1b2137;
  margin-top:100px
  width: 100%;
  height: 820px;
  .map{
    width: 100%;
    height: 820px;
  }
  .overlaybtn {
   //z-index: 1;
    position:absolute;
    top: 120px;
    left: 465px;
    display:grid;

  }
  .buttons {
    display:grid;

  }

  .button {    
    border-radius: 10px;    
    border: 0;
    padding: 5px 25px;
    margin : 4px;
    //margin : 7px;
    display: inline-block;
    text-align: center;
    font-size:11pt;
    color: white;
    
  }
  
  .button:hover {
    background: rgba(117, 166, 252, 1);  /* hover 시 색상 변경 */
    cursor: pointer;
    transform: scale(1.05);  /* 약간 확대 */
    transition: all 0.2s ease-in-out;
  }
   .blue {
    background: rgba(117, 166, 252,0.7);
    //background: rgba(64, 66, 197,0.5);
  }
  .br {
    background: rgba(172,145,115,0.3);
  }
  .gr {
    background: rgba(7,154,62,0.3);
  }
  .or {
    background: rgba(235,97,0,0.3);
  }
  .pu {
    background: rgba(112,0,236,0.3);
  }
  .yl {
    background: rgba(242,236,0,0.4);
  }
  .red {
    background: rgba(236,0,0,0.3);
  }

  .button:active {
    top: 20px; 
    box-shadow: 0 0 gray; 
    background: rgba(168,179,202,0.8);
  }

  .button:active {
    top: 20px; 
    box-shadow: 0 0 gray; 
    background: rgba(168,179,202,0.8);
  }

 
.tourOn {
  border-radius: 10px;    
  border: 0;
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 8px rgba(50, 50, 50, 0.5);
  margin: 3px;
  display: inline-block;
  color: #21212e;
  font-size: 16px;
  font-weight: 600;
  padding: 3px;
  width: 85px;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e0e0e0; /* 밝은 회색 */
    cursor: pointer;
  }
}

.tourOff {
  border-radius: 10px;    
  border: 0;
  background: #333344;
  margin: 3px;
  display: inline-block;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 3px;
  width: 85px;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background:rgb(56, 56, 92); /* 살짝 밝은 회색 계열 */
    cursor: pointer;
  }
}


  .scanner {
    background: linear-gradient(to right, #75A6FC, #F2D9D8);
    color:white;
    font-size: 15pt;
    padding: 6px;
    width: 90px;
  }
  
  .arrowbtnprev {
    position:absolute;
    top: 50%;
		//right: 10px;
    left: 455px;
    display:grid;
  }
  .arrowbtnnext {
    position:absolute;
    top: 50%;
		//right: 10px;
    right: 455px;
    display:grid;
  }
  .prev {
    //width:50%;
    heigth:5px;
  }
`;

const Background = styled.div`
  // 전역 폰트 설정
  font-family: "Pretendard", sans-serif;
  


  height:820px;
  .iframeBox {
    position:relative
    width: 100%;
    height: 820px;

  }
  .iframe {
    width: 100%;
    height: 100%;
  }
  .overlayleft {
    top:100px;
    position:absolute;
    display: grid;
    grid-template-columns: 5fr 1fr;
    width: 50px;
    height: 850px;
    //z-index:1;
  }
  .overlaydash {
    width: 450px;
    height: 820px;
    background: #22222E;
    transform: translate(0px, 0px);
    transition-duration: 0.5s;
    //z-index:1;
    opacity: 0.9;
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
    grid-template-columns:2.2fr 1fr 1fr 1fr;
  }

  .overlayright {
    position:absolute;
    top:100px;
    right: 0;
    display: grid;
    width: 450px;
    height: 820px;
    background: #22222E;
    //z-index:1;
    //text-align: center;
    opacity: 0.9;
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
    font-size: 11pt;
    font-weight: 600;
    color: black;
    margin-bottom:15px;
    margin-left: -20px;
  }
 
  .darkback{
    .overlay{
    background: rgba(146,155,180,0.4);
  }}

  .scannerbtn {
    margin: 30px;
  }
.zoneleft {
  margin: 0;
  margin-left: 12px;
}


  .zone {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;    
    border: 0;    
    display: inline-block;
    color:white;
    font-size: 16px;
    padding: 2px;
    width: 137.5px;
    margin:  1px 1px 0 1px;
    text-align: center;
  }

.zoneSelct {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.zoneNotSelct {
  background: rgb(93, 99, 114);

  &:hover {
    background: rgba(117, 166, 252, 0.7); /* 밝은 블루 */
  }
}

  .total2 {
    margin-bottom: 0;
  }
  
  .infotitle {
    //margin-left: 197px;
    margin-top: 5px;
    font-size: 18px;
    color: #303030;
    text-align: center;
    font-weight: 600;
  }

`;

const Dash = () => {
  const dispatch = useDispatch();
  const { me, lastMonday, lastSunday, today, ago7day, yesterday, nowTime } = useSelector((state) => state.auth);
  const { zonedatas, scanners, zonedatasHistory, scannersHistory } = useSelector((state) => state.scanner);
  const scanDevice = scanners;
  const zoneData = zonedatas;

  const zones = [
    "내연산/보경사",
    "해상스카이워크",
    "스페이스워크(환호공원)",
    "영일대해수욕장/해상누각",
    "연오랑세오녀 테마공원(귀비고)",
    "일월문화공원",
    "오어사",
    "구룡포 일본인가옥거리",
    "호미곶 해맞이광장",
    "송도송림테마거리(솔밭도시숲)",
    "송도해수욕장",
    "사방기념공원",
    "이가리 닻 전망대",
    "장기유배문화체험촌",
  ];

  // 존 범위 원형으로 표기해야하는 것
  const zone2 = ["내연산/보경사", "해상스카이워크", "스페이스워크(환호공원)", "오어사", "일본인가옥거리", "사방기념공원", "이가리닻전망대", "장기유배문화체험촌"];

  const scanDevices = JSON.parse(JSON.stringify(scanDevice)); //json 깊은 복사

  var tourTimer;

  const [zoneSection, setZoneSection] = useState("영일대 권역");
  const [onchangeZone, setOnChangeZone] = useState(false);
  const [tours, setTours] = useState(0);

  var tourCnt = 0;

  const Map = () => {
    const [onOffZone, setOnOffZone] = useState(false);
    const [onOffScanner, setOnOffScanner] = useState(false);
    const [onOffBound, setOnOffBound] = useState(false);
    const [onClickArrow, setOnClickArrow] = useState(0);

    const [visitor1, setVisitor1] = useState(0);
    const [visitor2, setVisitor2] = useState(0);
    const [visitor3, setvisitor3] = useState(0);
    const [visitor4, setVisitor4] = useState(0);
    const [visitor5, setVisitor5] = useState(0);
    const [visitor6, setVisitor6] = useState(0);
    const [visitor7, setVisitor7] = useState(0);
    const [visitor8, setVisitor8] = useState(0);
    const [visitor9, setVisitor9] = useState(0);
    const [visitor10, setVisitor10] = useState(0);
    const [visitor11, setVisitor11] = useState(0);
    const [visitor12, setVisitor12] = useState(0);
    const [visitor13, setVisitor13] = useState(0);
    const [visitor14, setVisitor14] = useState(0);

    const [visitorHistory, setVisitorHistory] = useState(0);

    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    //오늘 방문객 데이터 가져오기
    const getAPIdata = async () => {
      /**
       * 오늘자 방문객 그래프
       */
      try {
        const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);

        //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);

        let arrY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i of responseToday.data) {
          for (let j = 0; j < zones.length; j++) {
            if (i.zone_id === zones[j]) {
              arrY[j] = i.data;
              break;
            }
          }
        }

        setVisitor1(arrY[0]);
        setVisitor2(arrY[1]);
        setvisitor3(arrY[2]);
        setVisitor4(arrY[3]);
        setVisitor5(arrY[4]);
        setVisitor6(arrY[5]);
        setVisitor7(arrY[6]);
        setVisitor8(arrY[7]);
        setVisitor9(arrY[8]);
        setVisitor10(arrY[9]);
        setVisitor11(arrY[10]);
        setVisitor12(arrY[11]);
        setVisitor13(arrY[12]);
        setVisitor14(arrY[13]);
        setVisitorHistory(arrY[14]);
      } catch (err) {
        console.error(err);
      }
    };

    //장비데이터 가져오기(map)
    const getDeviceStatus2 = async () => {
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

      // try {
      //   // 장비정보가져오기 API
      //   const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
      //   const resultData = deviceResponse.data;
      //   // resultData에서 MAC과 ALIVE 값을 가져와 scanDevices와 비교
      //   for (let i of resultData) {
      //     for (let j of scanDevices) {
      //       if (j.mac === i.MAC) {
      //         // ALIVE 값에 따라 상태 설정
      //         j.status = i.ALIVE === 1 ? "ON" : "OFF";
      //         // j.status = "ON";
      //         j.info = ScannerStatus(j);
      //       }
      //     }
      //   }

      //   // mapConfig(); // 필요한 경우 주석을 해제해 사용
      // } catch (err) {
      //   console.error(err);
      // }

      try {
        // 장비정보 가져오기 API
        const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
        const resultData = deviceResponse.data;

        // 강제 ON 처리할 MAC 주소 목록
        const forceErrorMacs = ["D8659504102C"];

        // resultData에서 MAC과 ALIVE 값을 가져와 scanDevices와 비교
        for (let i of resultData) {
          for (let j of scanDevices) {
            if (j.mac === i.MAC) {
              // forceErrorMacs 목록에 포함된 MAC이면 무조건 "ON" 상태
              if (forceErrorMacs.includes(j.mac)) {
                j.status = "ON";
              } else {
                // ALIVE 값에 따라 상태 설정
                j.status = i.ALIVE === 1 ? "ON" : "OFF";
              }

              j.info = ScannerStatus(j);
            }
          }
        }

        // mapConfig(); // 필요한 경우 주석을 해제해 사용
      } catch (err) {
        console.error(err);
      }
    };

    /**
 * 지도설정

 */
    //지도에 맵 올리기
    const mapConfig = (zonePos, onScanner, onBound, selectZoom) => {
      getAPIdata();
      getDeviceStatus2();
      var locationss = [sessionStorage.getItem("lat"), sessionStorage.getItem("lon")];

      var zoom = Number(sessionStorage.getItem("zoom"));

      if (!locationss[0]) {
        var zone = new naver.maps.LatLng(36.0574065020324, 129.37638212320465);
        zoom = 18;
      } else {
        var zone = new naver.maps.LatLng(Number(locationss[0]), Number(locationss[1]));
        zoom = Number(sessionStorage.getItem("zoom"));
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

      //존영역 표시(사각형)
      // if (!onBound) {
      //   for (var i of zoneData) {
      //     //존영역표시
      //     if (i.zone == "황리단길 중심거리 1" || i.zone == "황리단길 북동" || i.zone == "황리단길 동") {
      //       continue;
      //     }
      //     var zoneBound = new naver.maps.Rectangle({
      //       map: map1,
      //       bounds: new naver.maps.LatLngBounds(new naver.maps.LatLng(i.boundstartlat, i.boundstartlon), new naver.maps.LatLng(i.boundendlat, i.boundendlon)),
      //       strokeColor: "rgba(0,0,0,0)",
      //       fillColor: i.boundcolor,
      //       fillOpacity: 0.2,
      //     });
      //   }
      // }

      //존영역 표시(원형)
      if (!onBound) {
        for (var i of zoneData) {
          //존영역표시
          /*if (i.zone == "영일대 권역") {
            continue;
          }*/
          if (true) {
            var zoneBound = new naver.maps.Circle({
              map: map1,
              center: new naver.maps.LatLng(i.lat, i.lon),
              radius: i.radius,
              strokeColor: "rgba(0,0,0,0)",
              fillColor: i.boundcolor,
              fillOpacity: 0.2,
            });
          }

          //존이름표시
        }
      }

      /**
       * 다각형표시
       */
      //영일대해수욕장 / 해상누각
      if (!onBound) {
        var polygonHistory = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(36.052638483505646, 129.37738152903086),
              new naver.maps.LatLng(36.05355470279086, 129.37842988330215),
              new naver.maps.LatLng(36.05629118069636, 129.37855665143965),
              new naver.maps.LatLng(36.0597400349054, 129.3800142559776),
              new naver.maps.LatLng(36.06177799980914, 129.38174016050456),
              new naver.maps.LatLng(36.061158126448724, 129.3830086677764),
              new naver.maps.LatLng(36.0616904504609, 129.38342420675497),
              new naver.maps.LatLng(36.06296570343672, 129.38182036411305),
              new naver.maps.LatLng(36.06155584930123, 129.38022432322015),
              new naver.maps.LatLng(36.06072749387726, 129.3792894483498),
              new naver.maps.LatLng(36.05734234029707, 129.37734554705534),
              new naver.maps.LatLng(36.053997102244345, 129.37611313572555),
              new naver.maps.LatLng(36.05185799209054, 129.37584909042886),
            ],
          ],
          fillColor: "yellow",
          fillOpacity: 0.3,
          strokeColor: "yellow",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });

        //송도해수욕장
        var polygonHD1 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(36.04017004615185, 129.37766099525328),
              new naver.maps.LatLng(36.037121415174255, 129.37918890449347),
              new naver.maps.LatLng(36.03468309056069, 129.38083491483937),
              new naver.maps.LatLng(36.03189152200345, 129.38347959446008),
              new naver.maps.LatLng(36.03143040714407, 129.3822011652254),
              new naver.maps.LatLng(36.03436029716641, 129.3798490295907),
              new naver.maps.LatLng(36.038680578426984, 129.37734995294656),
              new naver.maps.LatLng(36.040022492169335, 129.376469543171),
            ],
          ],
          fillColor: "red",
          fillOpacity: 0.3,
          strokeColor: "red",
          strokeOpacity: 0,
          strokeWeight: 3,
        });

        //호미곶
        var polygonHD2 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(36.07884320886685, 129.56685578641878),
              new naver.maps.LatLng(36.076408720031075, 129.56400206081256),
              new naver.maps.LatLng(36.07531309920946, 129.56552020200246),
              new naver.maps.LatLng(36.07640857418467, 129.56968434298437),
              new naver.maps.LatLng(36.07764977705318, 129.5702019824278),
            ],
          ],
          fillColor: "green",
          fillOpacity: 0.3,
          strokeColor: "green",
          strokeOpacity: 0,
          strokeWeight: 3,
        });

        //송도송림테마거리(솔밭도시숲)
        var polygonHD3 = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(36.0458244787764, 129.37603380830043),
              new naver.maps.LatLng(36.04282311211135, 129.37654265353174),
              new naver.maps.LatLng(36.04017004615185, 129.37766099525328),
              new naver.maps.LatLng(36.03982507997331, 129.37415614703707),
              new naver.maps.LatLng(36.042076649665866, 129.3737467391077),
              new naver.maps.LatLng(36.04432448415675, 129.3739806628685),
              new naver.maps.LatLng(36.04555084873121, 129.3748384842778),
            ],
          ],
          fillColor: "purple",
          fillOpacity: 0.3,
          strokeColor: "purple",
          strokeOpacity: 0,
          strokeWeight: 3,
        });

        //연오랑세오녀 테마공원(귀비고)
        var polygonBM = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(36.002102204308414, 129.45790409928676),
              new naver.maps.LatLng(36.00359003866928, 129.45894270122253),
              new naver.maps.LatLng(36.004201883151, 129.46205535752),
              new naver.maps.LatLng(36.0032803664344, 129.4628361315625),
              new naver.maps.LatLng(36.00219600592644, 129.46255291016513),
              new naver.maps.LatLng(36.00219600592644, 129.46255291016513),
              new naver.maps.LatLng(36.00091232773247, 129.4601290805384),
              new naver.maps.LatLng(36.00188883401706, 129.45776441737033),
            ],
          ],
          fillColor: "yellow",
          fillOpacity: 0.3,
          strokeColor: "yellow",
          strokeOpacity: 0,
          strokeWeight: 3,
        });
        //일월문화공원
        var polygonDH = new naver.maps.Polygon({
          map: map1,
          paths: [
            [
              new naver.maps.LatLng(35.965523500310766, 129.4276654006321),
              new naver.maps.LatLng(35.966854535305956, 129.42889761250945),
              new naver.maps.LatLng(35.966589669881685, 129.43018622401914),
              new naver.maps.LatLng(35.96582568075989, 129.43053962267635),
              new naver.maps.LatLng(35.96525696634421, 129.42903706631256),
              new naver.maps.LatLng(35.96517292962544, 129.42807027405118),
            ],
          ],
          fillColor: "orange",
          fillOpacity: 0.3,
          strokeColor: "orange",
          strokeOpacity: 0,
          strokeWeight: 3,
        });
      }

      /**
       * 존 및 스캐너 마커표시
       */
      if (onScanner) {
        for (var i of zoneData) {
          if (i.zone === zones[0]) {
            var visitor = visitor1;
          } else if (i.zone === zones[1]) {
            var visitor = visitor2;
          } else if (i.zone === zones[2]) {
            var visitor = visitor3;
          } else if (i.zone === zones[3]) {
            var visitor = visitor4;
          } else if (i.zone === zones[4]) {
            var visitor = visitor5;
          } else if (i.zone === zones[5]) {
            var visitor = visitor6;
          } else if (i.zone === zones[6]) {
            var visitor = visitor7;
          } else if (i.zone === zones[7]) {
            var visitor = visitor8;
          } else if (i.zone === zones[8]) {
            var visitor = visitor9;
          } else if (i.zone === zones[9]) {
            var visitor = visitor10;
          } else if (i.zone === zones[10]) {
            var visitor = visitor11;
          } else if (i.zone === zones[11]) {
            var visitor = visitor12;
          } else if (i.zone === zones[12]) {
            var visitor = visitor13;
          } else if (i.zone === zones[13]) {
            var visitor = visitor14;
          } else if (i.zone === zones[14]) {
            var visitor = visitor27;
          } else if (i.zone === zones[16]) {
            var visitor = visitorHistory;
          } else if (i.zone === zones[17]) {
            var visitor = visitor31;
          } else if (i.zone === zones[18]) {
            var visitor = visitor32;
          }

          var marker = new naver.maps.Marker({
            map: map1,
            position: naver.maps.LatLng(i.lat, i.lon),
            title: i.zone,
            icon: {
              content: "<img src=" + HOME_PATH + "/images/marker_" + i.boundcolor + ".png>",
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
          if (i.zone == zones[0] || i.zone == zones[7] || i.zone == zones[10] || i.zone == zones[11]) {
            var color = "rd";
          } else if (i.zone === zones[5] || i.zone == zones[6]) {
            var color = "or";
          } else if (i.zone === zones[1] || i.zone == zones[4] || i.zone == zones[12] || i.zone === zones[3]) {
            var color = "yl";
          } else if (i.zone == zones[2] || i.zone == zones[8] || i.zone == zones[13]) {
            var color = "gr";
          } else if (i.zone === zones[9]) {
            var color = "pu";
          } else {
            var color = "gray";
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
          //존이름표시
          var text = new naver.maps.Marker({
            map: map1,
            position: new naver.maps.LatLng(i.textlat, i.textlon),
            title: i.zonename,
            icon: {
              content: '<div style="text-align:center; font-size:13pt; color:' + i.boundcolor + '; font-weight:600; text-shadow:1px 1px 1px #000;">' + i.zonename + "</div>",
            },
          });
        }
      }
    };

    const ChangeZone = (cnt) => {
      if (tourCnt == 1) {
        onClickZoneYeongilBeach();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 2) {
        onClickZoneYeongilSpace();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 3) {
        onClickZoneYeongilSky();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 4) {
        onClickZoneSongdobeach();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 5) {
        onClickZoneSongdoCityForest();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 6) {
        onClickZoneLigariAnchor();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 7) {
        onClickZoneLigariMemoriPark();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 8) {
        onClickZoneBogyeongTmp();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 9) {
        onClickZoneHomigotYeonoh();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 10) {
        onClickZoneHomigotWelcomeSun();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 11) {
        onClickZoneHomigotJapanStr();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 12) {
        onClickZoneNampoOhasa();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 13) {
        onClickZoneNampoCulturePark();
        tourCnt = tourCnt + 1;
      } else if (tourCnt == 0) {
        onClickZoneNampoExile();
        tourCnt = 0;
      }
    };

    //양옆화살표 클릭시
    const ArrowChangeZone = (cnt) => {
      if (cnt == 1) {
        onClickZoneYeongilBeach();
      } else if (cnt == 2) {
        onClickZoneYeongilSpace();
      } else if (cnt == 3) {
        onClickZoneYeongilSky();
      } else if (cnt == 4) {
        onClickZoneSongdobeach();
      } else if (cnt == 5) {
        onClickZoneSongdoCityForest();
      } else if (cnt == 6) {
        onClickZoneLigariAnchor();
      } else if (cnt == 7) {
        onClickZoneLigariMemoriPark();
      } else if (cnt == 8) {
        onClickZoneBogyeongTmp();
      } else if (cnt == 9) {
        onClickZoneHomigotYeonoh();
      } else if (cnt == 10) {
        onClickZoneHomigotWelcomeSun();
      } else if (cnt == 11) {
        onClickZoneHomigotJapanStr();
      } else if (cnt == 12) {
        onClickZoneNampoOhasa();
      } else if (cnt == 13) {
        onClickZoneNampoCulturePark();
      } else if (cnt == 0) {
        onClickZoneNampoExile();
      }
    };

    const onClickPrev = () => {
      var temp = onClickArrow - 1;
      if (onClickArrow == 0) {
        setOnClickArrow(13);
        temp = 13;
      } else {
        setOnClickArrow(onClickArrow - 1);
      }
      ArrowChangeZone(temp);
    };

    const onClickNext = () => {
      var temp = onClickArrow + 1;
      if (onClickArrow == 13) {
        setOnClickArrow(0);
        temp = 0;
      } else {
        setOnClickArrow(onClickArrow + 1);
      }
      ArrowChangeZone(temp);
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

    //존 투어버튼 클릭시
    const onChangeZone = () => {
      var zone = !onchangeZone;
      setOnChangeZone(!onchangeZone);
      if (zone) {
        clearInterval(Number(sessionStorage.getItem("tour", tourTimer))); // 다른 창에 갔다 올 때 세션에 저장된 투어 삭제
        tourTimer = setInterval(ChangeZone, 10000); // 10초 간격으로 존 표시영역변경
        sessionStorage.setItem("tour", tourTimer);
        setTours(tourTimer);
      } else {
        //clearInterval(tours);
        clearInterval(Number(sessionStorage.getItem("tour", tourTimer)));
      }
    };

    const zonePoss = (lat, lon, zoom) => {
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      sessionStorage.setItem("zoom", zoom);
      mapConfig(new naver.maps.LatLng(lat, lon), onOffScanner, onOffBound, zoom);
    };

    const onClickZoneYeongilBeach = (e) => {
      //영일대해수욕장
      zonePoss(36.058801384637334, 129.3811164014791, 16);
    };
    const onClickZoneYeongilSpace = (e) => {
      //스페이스워크(환호공원)
      zonePoss(36.065877721069505, 129.39291799678568, 17);
    };
    const onClickZoneYeongilSky = (e) => {
      //해상스카이워크
      zonePoss(36.07232550155056, 129.41323419834518, 18);
    };
    const onClickZoneSongdobeach = (e) => {
      //송도해수욕장
      zonePoss(36.03885900158593, 129.3799359254328, 16);
    };
    const onClickZoneSongdoCityForest = (e) => {
      //송도솔밭도시숲
      zonePoss(36.04316791782928, 129.37505671379162, 17);
    };
    const onClickZoneLigariAnchor = (e) => {
      //이가리닻전망대
      zonePoss(36.18791808269388, 129.37941370451617, 18);
    };
    const onClickZoneLigariMemoriPark = (e) => {
      //사방기념공원
      zonePoss(36.16482331356112, 129.39547908857242, 17);
    };
    const onClickZoneBogyeongTmp = (e) => {
      //보경사
      zonePoss(36.058801384637334, 129.3811164014791, 16);
    };
    const onClickZoneHomigotYeonoh = (e) => {
      // 연오랑세오녀
      zonePoss(36.003532134486775, 129.4593497816217, 18);
    };
    const onClickZoneHomigotWelcomeSun = (e) => {
      //호미곶해맞이공원
      zonePoss(36.077797142530414, 129.56700627788888, 17);
    };
    const onClickZoneHomigotJapanStr = (e) => {
      //일본인가옥거리
      zonePoss(35.991524172951735, 129.56123527532696, 18);
    };
    const onClickZoneNampoOhasa = (e) => {
      //오어사
      zonePoss(35.926368458647474, 129.3691974854341, 18);
    };
    const onClickZoneNampoCulturePark = (e) => {
      //일월문화공원
      zonePoss(35.966084289861385, 129.4286703567014, 18);
    };
    const onClickZoneNampoExile = (e) => {
      //장기유배문화체험존
      zonePoss(35.90303565181264, 129.48640363355688, 18);
    };

    useEffect(() => {
      getAPIdata();
      getDeviceStatus2();
      setInterval(getAPIdata, 90000);

      setInterval(getDeviceStatus2, 180000);
    }, []);

    useEffect(() => {
      // API 새로 고침할때마다 지도 다시 그려줌
      mapConfig();
    }, [visitor1]);
    useEffect(() => {
      // 왼쪽 overlay 권역 클릭시 맵 위치 변경
      if (zoneSection == "영일대 권역") {
        zonePoss(36.0574065020324, 129.37638212320465, 15);
      } else if (zoneSection == "송도해수욕장 권역") {
        zonePoss(36.0381949579403, 129.378439134702, 16);
      } else if (zoneSection == "이가리 권역") {
        zonePoss(36.17618594631182, 129.390000642294, 14);
      } else if (zoneSection == "내연산/보경사") {
        zonePoss(36.24961176673499, 129.3194578510704, 17);
      } else if (zoneSection == "호미곶면 권역") {
        zonePoss(36.07716572541909, 129.56756701726246, 18);
      } else if (zoneSection == "남포항 권역") {
        zonePoss(35.9656658754064, 129.42908838827276, 18);
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
              <button className={onOffZone ? "tourOff" : "tourOn"} onClick={onClickZones}>
                {" "}
                zone
              </button>
              <button className={onOffBound ? "tourOff" : "tourOn"} onClick={onClickBound}>
                {" "}
                bound
              </button>
              {/* <button className={onchangeZone ? "tourOff" : "tourOn"} onClick={onChangeZone}>
                {" "}
                tour
              </button> */}
            </div>
            {onOffZone ? (
              zoneSection == "영일대 권역" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneYeongilBeach}>
                    {" "}
                    영일대해수욕장/해상누각
                  </button>
                  <button className="button blue" onClick={onClickZoneYeongilSpace}>
                    {" "}
                    스페이스워크(환호공원)
                  </button>
                  <button className="button blue" onClick={onClickZoneYeongilSky}>
                    {" "}
                    해상스카이워크
                  </button>
                </div>
              ) : zoneSection == "송도해수욕장 권역" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneSongdobeach}>
                    {" "}
                    송도해수욕장
                  </button>
                  <button className="button blue" onClick={onClickZoneSongdoCityForest}>
                    {" "}
                    송도송림테마거리(솔밭도시숲)
                  </button>
                </div>
              ) : zoneSection == "이가리 권역" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneLigariAnchor}>
                    {" "}
                    이가리 닻 전망대
                  </button>
                  <button className="button blue" onClick={onClickZoneLigariMemoriPark}>
                    {" "}
                    사방기념공원
                  </button>
                </div>
              ) : zoneSection == "내연산/보경사" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneBogyeongTmp}>
                    {" "}
                    내연산/보경사
                  </button>
                </div>
              ) : zoneSection == "호미곶면 권역" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneHomigotYeonoh}>
                    {" "}
                    연오랑세오녀 테마공원(귀비고)
                  </button>
                  <button className="button blue" onClick={onClickZoneHomigotWelcomeSun}>
                    {" "}
                    호미곶 해맞이광장
                  </button>
                  <button className="button blue" onClick={onClickZoneHomigotJapanStr}>
                    {" "}
                    구룡포 일본인가옥거리
                  </button>
                </div>
              ) : zoneSection == "남포항 권역" ? (
                <div className="buttons">
                  <button className="button blue" onClick={onClickZoneNampoOhasa}>
                    {" "}
                    오어사
                  </button>
                  <button className="button blue" onClick={onClickZoneNampoCulturePark}>
                    {" "}
                    일월문화공원
                  </button>
                  <button className="button blue" onClick={onClickZoneNampoExile}>
                    {" "}
                    장기유배문화체험존
                  </button>
                </div>
              ) : (
                <div className="buttons"></div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="arrowbtnprev">
            <Image className="prev" src={previcon} onClick={onClickPrev}></Image>
          </div>
          <div className="arrowbtnnext">
            <Image className="next" src={nexticon} onClick={onClickNext}></Image>
          </div>
        </Mapp>
      </>
    );
  };

  const Home = () => {
    // 영일대 권역
    const [allWeekInfoYeongil, setAllWeekInfoYeongil] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitYeongil, setLastWeekRevisitYeongil] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasYeongil, setTodayCurrentVisitorChartDatasYeongil] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    // 송도해수욕장 권역
    const [allWeekInfoSongdo, setAllWeekInfoSongdo] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitSongdo, setLastWeekRevisitSongdo] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasSongdo, setTodayCurrentVisitorChartDatasSongdo] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    // 이가리 권역
    const [allWeekInfoLigari, setAllWeekInfoLigari] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitLigari, setLastWeekRevisitLigari] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasLigari, setTodayCurrentVisitorChartDatasLigari] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    // 내연산/보경사
    const [allWeekInfoBogyeongTmp, setAllWeekInfoBogyeongTmp] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitBogyeongTmp, setLastWeekRevisitBogyeongTmp] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasBogyeongTmp, setTodayCurrentVisitorChartDatasBogyeongTmp] = useState([0]);
    // 호미곶면 권역
    const [allWeekInfoHomigot, setAllWeekInfoHomigot] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitHomigot, setLastWeekRevisitHomigot] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasHomigot, setTodayCurrentVisitorChartDatasHomigot] = useState([0]);
    // 남포항 권역
    const [allWeekInfoNampo, setAllWeekInfoNampo] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [lastWeekRevisitNampo, setLastWeekRevisitNampo] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [todayCurrentVisitorChartDatasNampo, setTodayCurrentVisitorChartDatasNampo] = useState([0, 0, 0]);

    // 영일대 권역
    const [daylabelYeongil1, setDaylabelYeongil1] = useState([]);
    const [daylabelYeongil2, setDaylabelYeongil2] = useState([]);
    // 송도해수욕장 권역
    const [daylabelSongdo1, setDaylabelSongdo1] = useState([]);
    const [daylabelSongdo2, setDaylabelSongdo2] = useState([]);
    // 이가리 권역
    const [daylabelLigari1, setDaylabelLigari1] = useState([]);
    const [daylabelLigari2, setDaylabelLigari2] = useState([]);
    // 내연산/보경사
    const [daylabelBogyeongTmp1, setDaylabelBogyeongTmp1] = useState([]);
    const [daylabelBogyeongTmp2, setDaylabelBogyeongTmp2] = useState([]);
    // 호미곶면 권역
    const [daylabelHomigot1, setDaylabelHomigot1] = useState([]);
    const [daylabelHomigot2, setDaylabelHomigot2] = useState([]);
    // 남포항 권역
    const [daylabelNampo1, setDaylabelNampo1] = useState([]);
    const [daylabelNampo2, setDaylabelNampo2] = useState([]);

    // pieChart(도넛차트) 라벨명 지정
    //영일대 권역
    const pielabelYeongil = ["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"];
    //송도해수욕장 권역
    const pielabelSongdo = ["송도해수욕장", "송도송림테마거리(솔밭도시숲)"];
    //이가리 권역
    const pielabelLigari = ["이가리 닻 전망대", "사방기념공원"];
    //내연산/보경사는 zone이 1개라 pieChart(도넛차트) 생략
    //호미곶면 권역
    const pielabelHomigot = ["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"];
    //남포항 권역
    const pielabelNampo = ["오어사", "일월문화공원", "장기유배문화체험존"];

    //영일대 권역
    const zoneYeongil = ["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"];
    //송도해수욕장 권역
    const zoneSongdo = ["송도해수욕장", "송도송림테마거리(솔밭도시숲)"];
    //이가리 권역
    const zoneLigari = ["이가리 닻 전망대", "사방기념공원"];
    //내연산/보경사
    const zoneBogyeongTmp = ["내연산/보경사"];
    //호미곶면 권역
    const zoneHomigot = ["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"];
    //남포항 권역
    const zoneNampo = ["오어사", "일월문화공원", "장기유배문화체험존"];

    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    const getAPIdata1 = async () => {
      //지난주 방문객 추이

      try {
        const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=` + ago7day + "&to=" + today);

        // 영일대 권역
        var zone_allYeongil = [];
        var dayLabelYeongil = [];
        var dayVisitYeongil = [];
        // 송도해수욕장 권역
        var zone_allSongdo = [];
        var dayLabelSongdo = [];
        var dayVisitSongdo = [];
        // 이가리 권역
        var zone_allLigari = [];
        var dayLabelLigari = [];
        var dayVisitLigari = [];
        // 내연산/보경사
        var zone_allBogyeongTmp = [];
        var dayLabelBogyeongTmp = [];
        var dayVisitBogyeongTmp = [];
        // 호미곶면 권역
        var zone_allHomigot = [];
        var dayLabelHomigot = [];
        var dayVisitHomigot = [];
        // 남포항 권역
        var zone_allNampo = [];
        var dayLabelNampo = [];
        var dayVisitNampo = [];
        for (let i of response1.data) {
          if (["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"].includes(i.zone)) {
            // 영일대 권역 데이터 추가
            const existing = dayVisitYeongil.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data; // 기존 데이터에 더함
            } else {
              dayVisitYeongil.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["송도해수욕장", "송도송림테마거리(솔밭도시숲)"].includes(i.zone)) {
            // 송도 권역 데이터 추가
            const existing = dayVisitSongdo.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayVisitSongdo.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["이가리 닻 전망대", "사방기념공원"].includes(i.zone)) {
            // 이가리 권역 데이터 추가
            const existing = dayVisitLigari.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayVisitLigari.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["내연산/보경사"].includes(i.zone)) {
            // 내연산/보경사 권역 데이터 추가
            const existing = dayVisitBogyeongTmp.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayVisitBogyeongTmp.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"].includes(i.zone)) {
            // 호미곶 권역 데이터 추가
            const existing = dayVisitHomigot.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayVisitHomigot.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["오어사", "일월문화공원", "장기유배문화체험존"].includes(i.zone)) {
            // 남포항 권역 데이터 추가
            const existing = dayVisitNampo.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayVisitNampo.push([i.data, i.time.slice(2, 10)]);
            }
          }
        }

        dayVisitYeongil.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayVisitSongdo.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayVisitLigari.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayVisitBogyeongTmp.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayVisitHomigot.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayVisitNampo.sort((a, b) => new Date(a[1]) - new Date(b[1]));

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
        };

        var NdayVisitYeongil = samedelete(dayVisitYeongil);
        var NdayVisitSongdo = samedelete(dayVisitSongdo);
        var NdayVisitLigari = samedelete(dayVisitLigari);
        var NdayVisitBogyeongTmp = samedelete(dayVisitBogyeongTmp);
        var NdayVisitHomigot = samedelete(dayVisitHomigot);
        var NdayVisitNampo = samedelete(dayVisitNampo);

        for (let i = 0; i < NdayVisitYeongil.length; i++) {
          zone_allYeongil.push(NdayVisitYeongil[i][0]);
          dayLabelYeongil.push(NdayVisitYeongil[i][1]);
        }
        for (let i = 0; i < NdayVisitSongdo.length; i++) {
          zone_allSongdo.push(NdayVisitSongdo[i][0]);
          dayLabelSongdo.push(NdayVisitSongdo[i][1]);
        }
        for (let i = 0; i < NdayVisitLigari.length; i++) {
          zone_allLigari.push(NdayVisitLigari[i][0]);
          dayLabelLigari.push(NdayVisitLigari[i][1]);
        }
        for (let i = 0; i < NdayVisitBogyeongTmp.length; i++) {
          zone_allBogyeongTmp.push(NdayVisitBogyeongTmp[i][0]);
          dayLabelBogyeongTmp.push(NdayVisitBogyeongTmp[i][1]);
        }
        for (let i = 0; i < NdayVisitHomigot.length; i++) {
          zone_allHomigot.push(NdayVisitHomigot[i][0]);
          dayLabelHomigot.push(NdayVisitHomigot[i][1]);
        }
        for (let i = 0; i < NdayVisitNampo.length; i++) {
          zone_allNampo.push(NdayVisitNampo[i][0]);
          dayLabelNampo.push(NdayVisitNampo[i][1]);
        }

        setAllWeekInfoYeongil(zone_allYeongil);
        setDaylabelYeongil1(dayLabelYeongil);

        setAllWeekInfoSongdo(zone_allSongdo);
        setDaylabelSongdo1(dayLabelSongdo);

        setAllWeekInfoLigari(zone_allLigari);
        setDaylabelLigari1(dayLabelLigari);

        setAllWeekInfoBogyeongTmp(zone_allBogyeongTmp);
        setDaylabelBogyeongTmp1(dayLabelBogyeongTmp);

        setAllWeekInfoHomigot(zone_allHomigot);
        setDaylabelHomigot1(dayLabelHomigot);

        setAllWeekInfoNampo(zone_allNampo);
        setDaylabelNampo1(dayLabelNampo);
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
        const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`);

        //const response3 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);

        //let resultList = [];
        var zoneDataYeongil = [];
        var zoneDataSongdo = [];
        var zoneDataLigari = [];
        var zoneDataBogyeongTmp = [];
        var zoneDataHomigot = [];
        var zoneDataNampo = [];

        for (let i of response3.data) {
          const index1 = zoneYeongil.indexOf(i.zone);
          if (index1 !== -1) {
            zoneDataYeongil[index1] = i.data;
          }
          const index2 = zoneSongdo.indexOf(i.zone);
          if (index2 !== -1) {
            zoneDataSongdo[index2] = i.data;
          }
          const index3 = zoneLigari.indexOf(i.zone);
          if (index3 !== -1) {
            zoneDataLigari[index3] = i.data;
          }
          const index4 = zoneBogyeongTmp.indexOf(i.zone);
          if (index4 !== -1) {
            zoneDataBogyeongTmp[index4] = i.data;
          }
          const index5 = zoneHomigot.indexOf(i.zone);
          if (index5 !== -1) {
            zoneDataHomigot[index5] = i.data;
          }
          const index6 = zoneNampo.indexOf(i.zone);
          if (index6 !== -1) {
            zoneDataNampo[index6] = i.data;
          }
        }

        setTodayCurrentVisitorChartDatasYeongil(zoneDataYeongil);
        setTodayCurrentVisitorChartDatasSongdo(zoneDataSongdo);
        setTodayCurrentVisitorChartDatasLigari(zoneDataLigari);
        setTodayCurrentVisitorChartDatasBogyeongTmp(zoneDataBogyeongTmp);
        setTodayCurrentVisitorChartDatasHomigot(zoneDataHomigot);
        setTodayCurrentVisitorChartDatasNampo(zoneDataNampo);
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          getAPIdata2();
        }, 2000);
      }
    };

    const getAPIdata3 = async () => {
      // 지난주 재방문객
      try {
        //const response4 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from=2021-10-01&to=2021-10-07`);
        const response4 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit?from=` + ago7day + "&to=" + today);

        var day_allYeongil = [];
        var dayLabelsYeongil = [];
        var dayReVisitYeongil = [];

        var day_allSongdo = [];
        var dayLabelsSongdo = [];
        var dayReVisitSongdo = [];

        var day_allLigari = [];
        var dayLabelsLigari = [];
        var dayReVisitLigari = [];

        var day_allBogyeongTmp = [];
        var dayLabelsBogyeongTmp = [];
        var dayReVisitBogyeongTmp = [];

        var day_allHomigot = [];
        var dayLabelsHomigot = [];
        var dayReVisitHomigot = [];

        var day_allNampo = [];
        var dayLabelsNampo = [];
        var dayReVisitNampo = [];

        for (let i of response4.data) {
          if (["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"].includes(i.zone)) {
            // 영일대 권역 데이터 추가
            const existing = dayReVisitYeongil.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data; // 기존 데이터에 더함
            } else {
              dayReVisitYeongil.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["송도해수욕장", "송도송림테마거리(솔밭도시숲)"].includes(i.zone)) {
            // 송도 권역 데이터 추가
            const existing = dayReVisitSongdo.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayReVisitSongdo.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["이가리 닻 전망대", "사방기념공원"].includes(i.zone)) {
            // 이가리 권역 데이터 추가
            const existing = dayReVisitLigari.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayReVisitLigari.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["내연산/보경사"].includes(i.zone)) {
            // 내연산/보경사 권역 데이터 추가
            const existing = dayReVisitBogyeongTmp.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayReVisitBogyeongTmp.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"].includes(i.zone)) {
            // 호미곶 권역 데이터 추가
            const existing = dayReVisitHomigot.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayReVisitHomigot.push([i.data, i.time.slice(2, 10)]);
            }
          } else if (["오어사", "일월문화공원", "장기유배문화체험존"].includes(i.zone)) {
            // 남포항 권역 데이터 추가
            const existing = dayReVisitNampo.find((item) => item[1] === i.time.slice(2, 10));
            if (existing) {
              existing[0] += i.data;
            } else {
              dayReVisitNampo.push([i.data, i.time.slice(2, 10)]);
            }
          }
        }

        dayReVisitYeongil.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayReVisitSongdo.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayReVisitLigari.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayReVisitBogyeongTmp.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayReVisitHomigot.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        dayReVisitNampo.sort((a, b) => new Date(a[1]) - new Date(b[1]));

        for (let i = 0; i < dayReVisitYeongil.length; i++) {
          day_allYeongil.push(dayReVisitYeongil[i][0]);
          dayLabelsYeongil.push(dayReVisitYeongil[i][1]);
        }
        for (let i = 0; i < dayReVisitSongdo.length; i++) {
          day_allSongdo.push(dayReVisitSongdo[i][0]);
          dayLabelsSongdo.push(dayReVisitSongdo[i][1]);
        }
        for (let i = 0; i < dayReVisitLigari.length; i++) {
          day_allLigari.push(dayReVisitLigari[i][0]);
          dayLabelsLigari.push(dayReVisitLigari[i][1]);
        }
        for (let i = 0; i < dayReVisitBogyeongTmp.length; i++) {
          day_allBogyeongTmp.push(dayReVisitBogyeongTmp[i][0]);
          dayLabelsBogyeongTmp.push(dayReVisitBogyeongTmp[i][1]);
        }
        for (let i = 0; i < dayReVisitBogyeongTmp.length; i++) {
          day_allHomigot.push(dayReVisitBogyeongTmp[i][0]);
          dayLabelsHomigot.push(dayReVisitBogyeongTmp[i][1]);
        }
        for (let i = 0; i < dayReVisitHomigot.length; i++) {
          day_allNampo.push(dayReVisitHomigot[i][0]);
          dayLabelsNampo.push(dayReVisitHomigot[i][1]);
        }
        for (let i = 0; i < dayReVisitNampo.length; i++) {
          day_allNampo.push(dayReVisitNampo[i][0]);
          dayLabelsNampo.push(dayReVisitNampo[i][1]);
        }
        setLastWeekRevisitYeongil(day_allYeongil);
        setDaylabelYeongil2(dayLabelsYeongil);

        setLastWeekRevisitSongdo(day_allSongdo);
        setDaylabelSongdo2(dayLabelsSongdo);

        setLastWeekRevisitLigari(day_allLigari);
        setDaylabelLigari2(dayLabelsLigari);

        setLastWeekRevisitBogyeongTmp(day_allBogyeongTmp);
        setDaylabelBogyeongTmp2(dayLabelsBogyeongTmp);

        setLastWeekRevisitHomigot(day_allHomigot);
        setDaylabelHomigot2(dayLabelsHomigot);

        setLastWeekRevisitNampo(day_allNampo);
        setDaylabelNampo2(dayLabelsNampo);
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
          <Nav value={"1"} />
          <div className="iframeBox">
            <Map className="iframe" zonesections={zoneSection} />
          </div>
          <div className="overlayleft">
            <div className="overlaydash">
              <div className="infotitle" style={{ color: "white" }}>
                권역 전체 방문객
              </div>
              <DashTotalInfo theme={me ? me.theme : ""} zone={"포항관광지 전체"} />
              <div className="infotitle" style={{ color: "white" }}>
                권역별 방문객
              </div>
              <div className="zoneleft">
                {[
                  { value: "영일대 권역", label: "영일대" },
                  { value: "송도해수욕장 권역", label: "송도해수욕장" },
                  { value: "이가리 권역", label: "이가리" },
                  { value: "내연산/보경사", label: "내연산" },
                  { value: "호미곶면 권역", label: "호미곶" },
                  { value: "남포항 권역", label: "남포항" },
                ].map(({ value, label }) => (
                  <button key={value} className={zoneSection === value ? "zone zoneSelct" : "zone zoneNotSelct"} onClick={() => setZoneSection(value)}>
                    {label}
                  </button>
                ))}
              </div>

              <DashAreaInfo theme={me ? me.theme : ""} zone={zoneSection} />
              <DashSoleInfo zone={zoneSection} scanners={scanners} zonedatas={zonedatas} />
            </div>
          </div>
          <div className="overlayright">
            <div className="overlaychart">
              <br />
              <div>
                <div className="charttitle" style={{ color: "white", display: "flex", alignItems: "center" }}>
                  <Image src={charticon} width={15} height={15} style={{ verticalAlign: "middle" }} />
                  &nbsp;&nbsp;
                  {zoneSection == "영일대 권역"
                    ? "영일대 권역 "
                    : zoneSection == "송도해수욕장 권역"
                    ? "송도해수욕장 권역 "
                    : zoneSection == "이가리 권역"
                    ? "이가리 권역 "
                    : zoneSection == "내연산/보경사"
                    ? "내연산/보경사 "
                    : zoneSection == "호미곶면 권역"
                    ? "호미곶면 권역 "
                    : zoneSection == "남포항 권역"
                    ? "남포항 권역 "
                    : ""}
                  방문객 추이{" "}
                </div>
                <BarChart
                  className="chart"
                  datas={
                    zoneSection == "영일대 권역"
                      ? allWeekInfoYeongil
                      : zoneSection == "송도해수욕장 권역"
                      ? allWeekInfoSongdo
                      : zoneSection == "이가리 권역"
                      ? allWeekInfoLigari
                      : zoneSection == "내연산/보경사"
                      ? allWeekInfoBogyeongTmp
                      : zoneSection == "호미곶면 권역"
                      ? allWeekInfoHomigot
                      : zoneSection == "남포항 권역"
                      ? allWeekInfoNampo
                      : ""
                  }
                  daylabel={
                    zoneSection == "영일대 권역"
                      ? daylabelYeongil1
                      : zoneSection == "송도해수욕장 권역"
                      ? daylabelSongdo1
                      : zoneSection == "이가리 권역"
                      ? daylabelLigari1
                      : zoneSection == "내연산/보경사"
                      ? daylabelBogyeongTmp1
                      : zoneSection == "호미곶면 권역"
                      ? daylabelHomigot1
                      : zoneSection == "남포항 권역"
                      ? daylabelNampo1
                      : ""
                  }
                />
              </div>
              <br />
              <div>
                <div className="charttitle" style={{ color: "white", display: "flex", alignItems: "center" }}>
                  <Image src={charticon} width={15} height={15} style={{ verticalAlign: "middle" }} />
                  &nbsp;&nbsp;
                  {zoneSection == "영일대 권역"
                    ? "영일대 권역 "
                    : zoneSection == "송도해수욕장 권역"
                    ? "송도해수욕장 권역 "
                    : zoneSection == "이가리 권역"
                    ? "이가리 권역 "
                    : zoneSection == "내연산/보경사"
                    ? "내연산/보경사 "
                    : zoneSection == "호미곶면 권역"
                    ? "호미곶면 권역 "
                    : zoneSection == "남포항 권역"
                    ? "남포항 권역 "
                    : " "}
                  재방문객 추이{" "}
                </div>
                <LineChart
                  className="chart"
                  datas={
                    zoneSection == "영일대 권역"
                      ? lastWeekRevisitYeongil
                      : zoneSection == "송도해수욕장 권역"
                      ? lastWeekRevisitSongdo
                      : zoneSection == "이가리 권역"
                      ? lastWeekRevisitLigari
                      : zoneSection == "내연산/보경사"
                      ? lastWeekRevisitBogyeongTmp
                      : zoneSection == "호미곶면 권역"
                      ? lastWeekRevisitHomigot
                      : zoneSection == "남포항 권역"
                      ? lastWeekRevisitNampo
                      : ""
                  }
                  daylabel={
                    zoneSection == "영일대 권역"
                      ? daylabelYeongil2
                      : zoneSection == "송도해수욕장 권역"
                      ? daylabelSongdo2
                      : zoneSection == "이가리 권역"
                      ? daylabelLigari2
                      : zoneSection == "내연산/보경사"
                      ? daylabelBogyeongTmp2
                      : zoneSection == "호미곶면 권역"
                      ? daylabelHomigot2
                      : zoneSection == "남포항 권역"
                      ? daylabelNampo2
                      : ""
                  }
                />
              </div>
              <br />
              {zoneSection == "내연산/보경사" ? (
                ""
              ) : (
                <div>
                  <div className="charttitle" style={{ color: "white", display: "flex", alignItems: "center" }}>
                    <Image src={charticon} width={15} height={15} style={{ verticalAlign: "middle" }} />
                    &nbsp;&nbsp;
                    {zoneSection == "영일대 권역"
                      ? "영일대 권역 "
                      : zoneSection == "송도해수욕장 권역"
                      ? "송도해수욕장 권역 "
                      : zoneSection == "이가리 권역"
                      ? "이가리 권역 "
                      : zoneSection == "내연산/보경사"
                      ? "내연산/보경사 "
                      : zoneSection == "호미곶면 권역"
                      ? "호미곶면 권역 "
                      : zoneSection == "남포항 권역"
                      ? "남포항 권역 "
                      : ""}
                    실시간 방문객{" "}
                  </div>
                  <div className="chartd">
                    <DoughnutChart
                      datas={
                        zoneSection == "영일대 권역"
                          ? todayCurrentVisitorChartDatasYeongil
                          : zoneSection == "송도해수욕장 권역"
                          ? todayCurrentVisitorChartDatasSongdo
                          : zoneSection == "이가리 권역"
                          ? todayCurrentVisitorChartDatasLigari
                          : zoneSection == "호미곶면 권역"
                          ? todayCurrentVisitorChartDatasHomigot
                          : zoneSection == "남포항 권역"
                          ? todayCurrentVisitorChartDatasNampo
                          : ""
                      }
                      label={
                        zoneSection == "영일대 권역"
                          ? pielabelYeongil
                          : zoneSection == "송도해수욕장 권역"
                          ? pielabelSongdo
                          : zoneSection == "이가리 권역"
                          ? pielabelLigari
                          : zoneSection == "호미곶면 권역"
                          ? pielabelHomigot
                          : zoneSection == "남포항 권역"
                          ? pielabelNampo
                          : ""
                      }
                    />
                  </div>
                </div>
              )}
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
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default Dash;
//export default Map;
