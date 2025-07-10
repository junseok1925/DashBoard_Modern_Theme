import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import { LOAD_ZONELISTS_REQUEST, LOAD_SCANNERLISTS_REQUEST, LOAD_ZONELISTS_HISTORY_REQUEST, LOAD_SCANNERLISTS_HISTORY_REQUEST } from "../reducers/scanner";
import wrapper from "../store/configureStore";
import Script from "next/script";
import styled from "styled-components";

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

  .tooltip {
    position: relative;
    display: block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  
    position: absolute;
    z-index: 100;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
  }

  .tooltip .tooltip-right {
    top: -5px;
    left: 105%;
  }
  
  .tooltip .tooltip-right::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent black transparent transparent;
  }
  .overlaybtn {
   //z-index: 1;
    position:absolute;
    top: 10px;
		//right: 10px;
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
    font-weight: bold;
    font-size:11pt;
    color: white;
    
   // background: rgba(117,166,252,0.5);
    //background: linear-gradient(to right, rgba(0,0,0,0.5),  rgba(255,255,255,0.3));
    //box-shadow: 0px 4px 0px rgba(168,179,202,1);
  }
  
   .blue {
    background: rgba(0,112,192,0.3);
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

  .zone {
    border-radius: 10px;    
    border: 0;
    //background: linear-gradient(to right, #75A6FC, #75A6FC, rgba(255,255,255,0.3));
    background: rgba(117,166,252,1);
    box-shadow: 0px 4px 0px rgba(168,179,202,1);
    margin : 3px;
    display: inline-block;
    color:white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 3px;
    width: 85px;
    text-align: center;
  }

  .zone:active {
    top: 20px; 
    box-shadow:inset 4px 4px rgba(140,140,140,0.8); 
    background: rgba(168,179,202,1);
  }

  .scanner {
    background: linear-gradient(to right, #75A6FC, #F2D9D8);
    color:white;
    font-weight: bolder;
    font-size: 15pt;
    padding: 6px;
    width: 90px;
  }
`;

const Map = () => {
  const [onOffZone, setOnOffZone] = useState(false);
  const [onOffScanner, setOnOffScanner] = useState(false);
  const [onOffBound, setOnOffBound] = useState(false);
  const [onchangeZone, setOnChangeZone] = useState(false);

  const [location, setLocation] = useState([35.8356, 129.2115]);

  const slideEl = useRef(null);
  const [settings, setSettings] = useState({});

  //방문객 수
  const [visitor1, setVisitor1] = useState(0);
  const [visitor2, setVisitor2] = useState(0);
  const [visitor3, setVisitor3] = useState(0);
  const [visitor4, setVisitor4] = useState(0);
  const [visitor5, setVisitor5] = useState(0);
  const [visitor6, setVisitor6] = useState(0);
  const [visitor7, setVisitor7] = useState(0);
  const [visitor8, setVisitor8] = useState(0);

  var zoneSection = "";

  const zones = [
    "황리단길 중심거리 1",
    "황리단길 중심거리 2",
    "황리단길 중심거리 3",
    "황리단길 북동",
    "황리단길 동남",
    "황리단길 동",
    "황리단길 서",
    "황리단길 서남",
    "불국사존",
    "석굴암존",
    "봉황대고분존",
    "동궁과월지존",
    "첨성대존",
    "교촌마을존",
    "경주 터미널 온누리 약국 앞",
    "황리단길 전체",
  ];
  const zone2 = ["불국사존", "석굴암존", "봉황대고분존", "동궁과월지존", "교촌마을존", "경주 터미널 온누리 약국 앞", "황리단길 전체"];
  //const zones = [1859, 1860, 1861, 1862, 1910, 1911, 1912, 1914];

  const { me } = useSelector((state) => state.auth);
  const { zonedatas, scanners, zonedatasHistory, scannersHistory, zonesection } = useSelector((state) => state.scanner);
  const scanDevice = me.section == 2 ? scannersHistory : scanners;
  const zoneData = me.section == 2 ? zonedatasHistory : zonedatas;

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

      let arrY1 = ["중심거리1"];
      let arrY2 = ["중심거리2"];
      let arrY3 = ["중심거리3"];
      let arrY4 = ["북동거리"];
      let arrY5 = ["동남거리"];
      let arrY6 = ["동방거리"];
      let arrY7 = ["서방거리"];
      let arrY8 = ["서남거리"];

      for (let i of responseToday.data) {
        if (i.zone_id === zones[0]) {
          arrY1.push(i.data);
        } else if (i.zone_id === zones[1]) {
          arrY2.push(i.data);
        } else if (i.zone_id === zones[2]) {
          arrY3.push(i.data);
        } else if (i.zone_id === zones[3]) {
          arrY4.push(i.data);
        } else if (i.zone_id === zones[4]) {
          arrY5.push(i.data);
        } else if (i.zone_id === zones[5]) {
          arrY6.push(i.data);
        } else if (i.zone_id === zones[6]) {
          arrY7.push(i.data);
        } else if (i.zone_id === zones[7]) {
          arrY8.push(i.data);
        }
      }

      setVisitor1(arrY1[1]);
      setVisitor2(arrY2[1]);
      setVisitor3(arrY3[1]);
      setVisitor4(arrY4[1]);
      setVisitor5(arrY5[1]);
      setVisitor6(arrY6[1]);
      setVisitor7(arrY7[1]);
      setVisitor8(arrY8[1]);
    } catch (err) {
      console.error(err);
    }
  };

  //장비데이터 가져오기
  const getDeviceStatus = async () => {
    //스캐너 정보저장
    const ScannerStatus = (scannerInfo) => {
      return ` 
    <br/>[장비정보] <br/>
    MAC : ${scannerInfo["mac"]} <br/>
    INTMAC : ${scannerInfo["intmac"]} <br/>
    장비타입 : ${scannerInfo["type"]}<br/>
    상태 : ${scannerInfo["status"]}
    `;
    };

    for (var j of scanDevice) {
      j.info = ScannerStatus(j);
    }

    try {
      //장비정보가져오기API
      //const deviceResponse = await axios.get(`http://54.180.158.22:8000/v1/DaeguDalseong/DeviceStatus`);
      const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
      const resultData = deviceResponse.data;

      for (let i of resultData) {
        for (var j of scanDevice) {
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

      for (var j of scanDevice) {
        if (j.mac == i.MAC) {
          if (i.ALIVE === 1) {
            j.status = "ON";
          } else if (i.ALIVE === 0) {
            j.status = "OFF";
          }
        }
        j.info = ScannerStatus(j);
      }
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
    getDeviceStatus();

    var locationss = [sessionStorage.getItem("lat"), sessionStorage.getItem("lon")];

    var zoom = Number(sessionStorage.getItem("zoom"));

    //var zone = new naver.maps.LatLng(locationss[0],locationss[1]);
    var zone = new naver.maps.LatLng(Number(locationss[0]), Number(locationss[1]));

    if (!locationss[0]) {
      var zone = new naver.maps.LatLng(35.8356, 129.2115);
      zoom = 17;
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
    /*if (!onBound) {
    for (var i of zoneData){
      //존영역표시
      var zoneBound = new naver.maps.Rectangle({
        map: map1,
        bounds: new naver.maps.LatLngBounds(
          new naver.maps.LatLng(i.boundstartlat, i.boundstartlon),
          new naver.maps.LatLng(i.boundendlat, i.boundendlon)
      ),
      strokeColor: 'rgba(0,0,0,0)',
      fillColor: i.boundcolor,
      fillOpacity: 0.2
      })
      //존이름표시
      var text = new naver.maps.Marker({
        map: map1,
        position: new naver.maps.LatLng(i.textlat, i.textlon),
        title: i.zone,
        icon: {
          content: '<div style="text-align:center; font-size:13pt; color:'+i.boundcolor+'; font-weight:bolder; text-shadow:1px 1px 1px #000;">'+i.zone+'</div>',
        },
        
      });
    }
  }*/

    //존영역 표시(원형)
    if (!onBound) {
      for (var i of zoneData) {
        //존영역표시
        //var radius = 130; //기본 원영역설정
        if (i.zone == "황리단길 전체") {
          continue;
        }
        // if (zone2.includes(i.zone)){
        //   radius = 70;
        //   if(i.zone == '봉황대고분존'){
        //     radius = 90;
        //   }
        // }
        var zoneBound = new naver.maps.Circle({
          map: map1,
          center: new naver.maps.LatLng(i.lat, i.lon),
          radius: i.radius,
          strokeColor: "rgba(0,0,0,0)",
          fillColor: i.boundcolor,
          fillOpacity: 0.2,
        });
        //존이름표시
      }
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
        } else {
          var visitor = 0;
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
      for (var i of scanDevice) {
        if (i.zone === zones[0]) {
          var color = "red";
        } else if (i.zone === zones[1]) {
          var color = "orange";
        } else if (i.zone === zones[2]) {
          var color = "yellow";
        } else if (i.zone === zones[3]) {
          var color = "green";
        } else if (i.zone === zones[4]) {
          var color = "blue";
        } else if (i.zone === zones[5]) {
          var color = "purple";
        } else if (i.zone === zones[6]) {
          var color = "brown";
        } else if (i.zone === zones[7]) {
          var color = "blue";
        } else if (i.zone === zones[8]) {
          var color = "red";
        } else if (i.zone === zones[9]) {
          var color = "orange";
        } else if (i.zone === zones[10]) {
          var color = "yellow";
        } else if (i.zone === zones[11]) {
          var color = "green";
        } else if (i.zone === zones[12]) {
          var color = "blue";
        } else if (i.zone === zones[13]) {
          var color = "purple";
        } else if (i.zone === zones[14]) {
          var color = "brown";
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
        if (i.zone == "황리단길 전체") {
          continue;
        }
        var text = new naver.maps.Marker({
          map: map1,
          position: new naver.maps.LatLng(i.lat, i.lon),
          title: i.zone,
          icon: {
            content: '<div style="text-align:center; font-size:13pt; color:' + i.boundcolor + '; font-weight:bolder; text-shadow:1px 1px 1px #000;">' + i.zone + "</div>",
          },
        });
      }
    }
  };

  const ChangeZone = (cnt) => {
    if (cnt == 1) {
      onClickZonePos1();
    } else if (cnt == 2) {
      onClickZonePos2();
    } else if (cnt == 3) {
      onClickZonePos3();
    } else if (cnt == 4) {
      onClickZonePos4();
    } else if (cnt == 5) {
      onClickZonePos5();
    } else if (cnt == 6) {
      onClickZonePos6();
    } else if (cnt == 7) {
      onClickZonePos7();
    } else if (cnt == 0) {
      onClickZonePos8();
    }
  };

  //스캐너버튼 클릭시
  const onClickScanner = () => {
    var scanner = !onOffScanner;
    setOnOffScanner(scanner);
    mapConfig(new naver.maps.LatLng(location[0], location[1]), scanner, onOffBound, sessionStorage.getItem("zoom"));
  };

  //존버튼 클릭시
  const onClickZones = () => {
    setOnOffZone(!onOffZone);
  };

  //바운드버튼 클릭시
  const onClickBound = () => {
    var bound = !onOffBound;
    setOnOffBound(!onOffBound);
    mapConfig(new naver.maps.LatLng(location[0], location[1]), onOffScanner, bound, sessionStorage.getItem("zoom"));
  };

  //존변경버튼 클릭시
  const onChangeZone = () => {
    var zone = !onchangeZone;
    setOnChangeZone(!onchangeZone);
  };

  const onClickZonePos1 = (e) => {
    //황리단 중심1
    setLocation([35.837865076402906, 129.20975070742932]);
    sessionStorage.setItem("lat", 35.837865076402906);
    sessionStorage.setItem("lon", 129.20975070742932);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.837865076402906, 129.20975070742932), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos2 = (e) => {
    //황리단 중심2
    setLocation([35.83641772664928, 129.20956946605287]);
    sessionStorage.setItem("lat", 35.83641772664928);
    sessionStorage.setItem("lon", 129.20956946605287);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.83641772664928, 129.20956946605287), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos3 = (e) => {
    //황리단 중심3
    setLocation([35.833941723885346, 129.20946758606377]);
    sessionStorage.setItem("lat", 35.833941723885346);
    sessionStorage.setItem("lon", 129.20946758606377);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.833941723885346, 129.20946758606377), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos4 = (e) => {
    //황리 북동
    setLocation([35.835981903795464, 129.21195304644826]);
    sessionStorage.setItem("lat", 35.835981903795464);
    sessionStorage.setItem("lon", 129.21195304644826);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.835981903795464, 129.21195304644826), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos5 = (e) => {
    // 황리 동남
    setLocation([35.83380721693253, 129.21212502399376]);
    sessionStorage.setItem("lat", 35.83380721693253);
    sessionStorage.setItem("lon", 129.21212502399376);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.83380721693253, 129.21212502399376), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos6 = (e) => {
    //황리 동
    setLocation([35.83483041104162, 129.21478697840539]);
    sessionStorage.setItem("lat", 35.83483041104162);
    sessionStorage.setItem("lon", 129.21478697840539);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.83483041104162, 129.21478697840539), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos7 = (e) => {
    //황리 서
    setLocation([35.836666537099184, 129.20804378934835]);
    sessionStorage.setItem("lat", 35.836666537099184);
    sessionStorage.setItem("lon", 129.20804378934835);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.836666537099184, 129.20804378934835), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos8 = (e) => {
    //황리 서남
    setLocation([35.83428349727689, 129.2082764896501]);
    sessionStorage.setItem("lat", 35.83428349727689);
    sessionStorage.setItem("lon", 129.2082764896501);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.83428349727689, 129.2082764896501), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos9 = (e) => {
    //불국사
    setLocation([35.7862720928056, 129.32887704033146]);
    sessionStorage.setItem("lat", 35.7862720928056);
    sessionStorage.setItem("lon", 129.32887704033146);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.7862720928056, 129.32887704033146), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos10 = (e) => {
    //석굴암
    setLocation([35.7897363584415, 129.34948654558244]);
    sessionStorage.setItem("lat", 35.7897363584415);
    sessionStorage.setItem("lon", 129.34948654558244);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.7897363584415, 129.34948654558244), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos11 = (e) => {
    //봉황대
    setLocation([35.8418396128661, 129.21114087085098]);
    sessionStorage.setItem("lat", 35.8418396128661);
    sessionStorage.setItem("lon", 129.21114087085098);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.8418396128661, 129.21114087085098), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos12 = (e) => {
    //동궁과월지
    setLocation([35.8333411100388, 129.2267456294713]);
    sessionStorage.setItem("lat", 35.8333411100388);
    sessionStorage.setItem("lon", 129.2267456294713);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.8333411100388, 129.2267456294713), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos13 = (e) => {
    //첨성대
    setLocation([35.834732295, 129.21760174006871]);
    sessionStorage.setItem("lat", 35.834732295);
    sessionStorage.setItem("lon", 129.21760174006871);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.834732295, 129.21760174006871), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos14 = (e) => {
    //교촌마을
    setLocation([35.8295354455455, 129.2147365822213]);
    sessionStorage.setItem("lat", 35.8295354455455);
    sessionStorage.setItem("lon", 129.2147365822213);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.8295354455455, 129.2147365822213), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos15 = (e) => {
    //터미널
    setLocation([35.8387029950045, 129.20411377849393]);
    sessionStorage.setItem("lat", 35.8387029950045);
    sessionStorage.setItem("lon", 129.20411377849393);
    sessionStorage.setItem("zoom", 18);
    mapConfig(new naver.maps.LatLng(35.8387029950045, 129.20411377849393), onOffScanner, onOffBound, 18);
  };
  const onClickZonePos16 = (e) => {
    //황리단길 전체
    setLocation([35.836147565167735, 129.21115263378698]);
    sessionStorage.setItem("lat", 35.836147565167735);
    sessionStorage.setItem("lon", 129.21115263378698);
    sessionStorage.setItem("zoom", 17);
    mapConfig(new naver.maps.LatLng(35.836147565167735, 129.21115263378698), onOffScanner, onOffBound, 17);
  };

  useEffect(() => {
    getAPIdata();
    setInterval(getAPIdata, 90000);

    getDeviceStatus();
    setInterval(getDeviceStatus, 180000);
  }, []);

  useEffect(() => {
    zoneSection = sessionStorage.getItem("zonesection");
  }, []);

  useEffect(() => {
    // API 새로 고침할때마다 지도 다시 그려줌
    mapConfig();
  }, [visitor1]);

  return (
    <>
      <Script type={"text/javascript"} src={"https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=t0gdynkrzk&submodules=visualization"} onReady={mapConfig}></Script>{" "}
      <Mapp>
        <div id="map1" className="map"></div>

        <div className="overlaybtn">
          <div>
            <button className="zone" onClick={onClickScanner}>
              {" "}
              scanner
            </button>
            <button className="zone" onClick={onClickZones}>
              {" "}
              zone
            </button>
            <button className="zone" onClick={onClickBound}>
              {" "}
              bound
            </button>
            {/* <button className='zone' onClick={onChangeZone} > tour</button>       */}
          </div>
          {onOffZone ? (
            <div className="buttons">
              <button className="button red" onClick={onClickZonePos9}>
                {" "}
                불국사
              </button>
              <button className="button or" onClick={onClickZonePos10}>
                {" "}
                석굴암
              </button>
              <button className="button yl" onClick={onClickZonePos11}>
                {" "}
                봉황대고분
              </button>
              <button className="button gr" onClick={onClickZonePos12}>
                {" "}
                동궁과월지
              </button>
              <button className="button blue" onClick={onClickZonePos13}>
                {" "}
                첨성대
              </button>
              <button className="button pu" onClick={onClickZonePos14}>
                {" "}
                교촌마을
              </button>
              <button className="button br" onClick={onClickZonePos15}>
                {" "}
                경주터미널
              </button>
              <button className="button blue" onClick={onClickZonePos16}>
                {" "}
                황리단길전체
              </button>
              <button className="button red" onClick={onClickZonePos1}>
                {" "}
                황리단길중심거리1
              </button>
              <button className="button or" onClick={onClickZonePos2}>
                {" "}
                황리단길중심거리2
              </button>
              <button className="button yl" onClick={onClickZonePos3}>
                {" "}
                황리단길중심거리3
              </button>
              <button className="button gr" onClick={onClickZonePos4}>
                {" "}
                황리단길북동
              </button>
              <button className="button blue" onClick={onClickZonePos5}>
                {" "}
                황리단길동남
              </button>
              <button className="button pu" onClick={onClickZonePos6}>
                {" "}
                황리단길동
              </button>
              <button className="button br" onClick={onClickZonePos7}>
                {" "}
                황리단길서
              </button>
              <button className="button blue" onClick={onClickZonePos8}>
                {" "}
                황리단길서남
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Mapp>
    </>
  );
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
    type: LOAD_ZONELISTS_HISTORY_REQUEST,
  });
  store.dispatch({
    type: LOAD_SCANNERLISTS_HISTORY_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Map;
