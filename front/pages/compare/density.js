import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import warning from "../../public/images/warning.png";
import danger from "../../public/images/danger.png";
//import dangerAudio from "../../public/sound/danger.wav"

import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import DoughnutChart from "../../components/charts/densityDoughnutChart";
import BarChart from "../../components/charts/densityBarChart";
import charticon from "../../public/images/chart_icon.png";
import redcircle from "../../public/images/redcircle.png";
import orangecircle from "../../public/images/orangecircle.png";
import greencircle from "../../public/images/greencircle.png";
import bluecircle from "../../public/images/bluecircle.png";
import infopng from "../../public/images/infopng.png";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import { LOAD_ZONELISTS_REQUEST, LOAD_SCANNERLISTS_REQUEST } from "../../reducers/scanner";
import wrapper from "../../store/configureStore";
import Script from "next/script";
import styled from "styled-components";

//지도 css
const Mapp = styled.div`
  font-family: "Pretendard", sans-serif;

  background-color: #1b2137;
  margin-top:100px
  width: 100%;
  height: 820px;
  .map{
    width: 100%;
    height: 820px;
  }
  .overlaybtn {
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
    display: inline-block;
    text-align: center;
    font-weight: bolder;
    font-size:13pt;
    color: white;
    //text-shadow: -0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000;
    
  }
  
   .blue {
    background: rgba(0,112,192,0.8);
  }
  .br {
    background: rgba(172,145,115,0.8);
  }
  .gr {
    background: rgba(7,154,62,0.8);
  }
  .or {
    background: rgba(235,97,0,0.8);
  }
  .pu {
    background: rgba(112,0,236,0.8);
  }
  .yl {
    background: rgba(242,236,0,0.8);
  }
  .red {
    background: rgba(236,0,0,0.8);
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

  .tourOff {
    border-radius: 10px;    
    border: 0;
    background: rgba(168,179,202,1);
    box-shadow:inset 4px 4px rgba(140,140,140,0.8); 
    margin : 3px;
    display: inline-block;
    color:white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 3px;
    width: 85px;
    text-align: center;
  }

  .scanner {
    background: linear-gradient(to right, #75A6FC, #F2D9D8);
    color:white;
    font-weight: bolder;
    font-size: 15pt;
    padding: 6px;
    width: 90px;
  }
  
  .arrowbtnprev {
    position:absolute;
    top: 50%;
    left: 455px;
    display:grid;
  }
  .arrowbtnnext {
    position:absolute;
    top: 50%;
    right: 435px;
    display:grid;
  }
  .prev {
    heigth:5px;
  }
`;

//대시보드 전체 css
const Background = styled.div`
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
  .overlay {
    position:absolute;
    top:136px;
    right: 0;
    display: grid;
    width: 450px;
    height: 820px;
    background: rgba(0, 0, 0, 0.7);  
  }
  .overlaydash {
    width: 450px;
    height: 820px;
    right: 0;
    top : 0;
    //background: rgba(255,255,255,0.7);
    transform: translate(0px, 0px);
    transition-duration: 0.5s;
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
    font-weight: bold;
  }

  .scannerbtn {
    margin: 30px;
  }
  .zoneleft{
    margin: 0;
    //margin-left: 11px;
  }

  .zone {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;    
    border: 0;    
    display: inline-block;
    color:white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 2px;
    width: 102.8px;
    margin:  3px 1px 0 1px;
    text-align: center;
  }


  
  .total2 {
    margin-bottom: 0;
  }
  
  .infotitle {
    margin-top: 20px;
    margin-bottom: 30px;
    font-weight:bolder;
    font-size: 13.5pt;
    color:rgb(255, 255, 255);
    text-align: center;
  }

  .infoexplain {
    margin-top: 15px;
    margin-left : 40px;
    font-size: 10pt;
    color: white;
  }

  .popup {
    position:absolute;       
    width: 320px;
    height: 200px;
    background: rgba(255,255,255); 
    box-shadow: 0px 0px 10px gray;
    border-radius: 15px;
    text-align : center;
    font-weight:600;
    font-size:15pt;
  }

  .unpopup {
    display : none;
  }

  .location0 {
    top:20%;
    left: 15%;
  }

  .location1 {
    top:410px;
    left: 20px;
  }

  .location2 {
    top:200px;
    left: 20px;
  }

  .warnings {
    margin : 30px 10px 20px 60px;
  }

  .infopng {
    position:absolute;
    top:150px;
    right: 450px;
  }

`;

const Dash = () => {
  const dispatch = useDispatch();
  const [density, setDensity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //밀집도
  const [visitor, setVisitor] = useState([0, 0, 0]); //방문객
  const [zoneNamess, setZoneNamess] = useState([
    "영일대해수욕장/해상누각",
    "스페이스워크(환호공원)",
    "해상스카이워크",
    "송도해수욕장",
    "송도송림테마거리(솔밭도시숲)",
    "이가리 닻 전망대",
    "사방기념공원",
    "내연산/보경사",
    "연오랑세오녀 테마공원(귀비고)",
    "호미곶 해맞이광장",
    "오어사",
    "일월문화공원",
    "장기유배문화체험촌",
  ]);
  const [warningState, setWarningState] = useState(false); //경고창 상태 후문
  const [dangerState, setDangerState] = useState(false); //위험창 상태
  const [warningZone, setWarningZone] = useState(""); //경고창 상태 후문
  const [dangerZone, setDangerZone] = useState(""); //위험창 상태
  const [onOffZone, setOnOffZone] = useState(false);
  const [activeZone, setActiveZone] = useState(""); // 활성화된 Zone 이름
  const polygonColors = ["rgb(225, 0, 0)", "rgb(225, 192, 0)", "rgb(0, 176, 80)", "rgb(0, 112, 192)"]; // 폴리곤 색상

  const zoneState = [
    {
      zonename: "영일대해수욕장/해상누각",
      zone: "영일대해수욕장/해상누각",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.058801384637334, 129.3811164014791],
      textlocation: [36.058801384637334, 129.3811164014791],
    },
    {
      zonename: "스페이스워크(환호공원)",
      zone: "스페이스워크(환호공원)",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.065877721069505, 129.39291799678568],
      textlocation: [36.065877721069505, 129.39291799678568],
    },
    {
      zonename: "해상스카이워크",
      zone: "해상스카이워크",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.07232550155056, 129.41323419834518],
      textlocation: [36.07232550155056, 129.41323419834518],
    },
    {
      zonename: "송도해수욕장",
      zone: "송도해수욕장",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.03885900158593, 129.3799359254328],
      textlocation: [36.03885900158593, 129.3799359254328],
    },
    {
      zonename: "송도송림테마거리(솔밭도시숲)",
      zone: "송도송림테마거리(솔밭도시숲)",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.04316791782928, 129.37505671379162],
      textlocation: [36.04316791782928, 129.37505671379162],
    },
    {
      zonename: "이가리 닻 전망대",
      zone: "이가리 닻 전망대",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.18791808269388, 129.37941370451617],
      textlocation: [36.18791808269388, 129.37941370451617],
    },
    {
      zonename: "사방기념공원",
      zone: "사방기념공원",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.16482331356112, 129.39547908857242],
      textlocation: [36.16482331356112, 129.39547908857242],
    },
    {
      zonename: "내연산/보경사",
      zone: "내연산/보경사",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.24961176673499, 129.3194578510704],
      textlocation: [36.249379425476626, 129.31889481547847],
    },
    {
      zonename: "연오랑세오녀 테마공원(귀비고)",
      zone: "연오랑세오녀 테마공원(귀비고)",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.003532134486775, 129.4593497816217],
      textlocation: [36.003532134486775, 129.4593497816217],
    },
    {
      zonename: "호미곶 해맞이광장",
      zone: "호미곶 해맞이광장",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [36.077797142530414, 129.56700627788888],
      textlocation: [36.077797142530414, 129.56700627788888],
    },
    {
      zonename: "오어사",
      zone: "오어사",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.926368458647474, 129.3691974854341],
      textlocation: [35.926368458647474, 129.3691974854341],
    },
    {
      zonename: "일월문화공원",
      zone: "일월문화공원",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.966084289861385, 129.4286703567014],
      textlocation: [35.966084289861385, 129.4286703567014],
    },
    {
      zonename: "장기유배문화체험촌",
      zone: "장기유배문화체험촌",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.90303565181264, 129.48640363355688],
      textlocation: [35.90303565181264, 129.48640363355688],
    },
  ];

  const [zoneStateNow, setZoneStateNow] = useState(zoneState);

  //const audio = new Audio('../../public/sound/danger.wav');

  const { me } = useSelector((state) => state.auth);
  const { zonedatas } = useSelector((state) => state.scanner);

  const getAPIdata = async () => {
    const densityStandard = [1, 3, 5];

    /**
     * 밀집도 가져오기 고위험 >= 1 > 위험 >= 0.5 > 주의 >= 0.01 > 정상
     */
    try {
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DensityZone`);
      let arrDensity = []; // 초기화
      let arrVisitor = []; // 초기화
      let zoneNames = [];
      let dangerZoneString = "";
      let warningZoneString = "";

      // 실시간 방문객 가져오기
      for (let i of responseToday.data) {
        for (let j of zoneState) {
          if (i.zone == j.zone) {
            j.density = i.density;
            j.visitor = i.visitor;

            if (i.density >= densityStandard[0]) {
              j.danger = true;
              j.warning = false;
              j.polygoncolor = polygonColors[0];
            } else if (i.density >= densityStandard[1]) {
              j.danger = false;
              j.warning = true;
              j.polygoncolor = polygonColors[1];
            } else if (i.density >= densityStandard[2]) {
              j.danger = false;
              j.warning = false;
              j.polygoncolor = polygonColors[2];
            } else {
              j.danger = false;
              j.warning = false;
              j.polygoncolor = polygonColors[3];
            }
            break;
          }
        }
      }

      //밀집도 및 방문객 그래프 데이터 넣기
      for (let i of zoneState) {
        arrDensity.push(i.density);
        arrVisitor.push(i.visitor);
        zoneNames.push(i.zonename);
        if (i.danger) {
          dangerZoneString = dangerZoneString + " " + i.zonename;
        } else if (i.warning) {
          warningZoneString = warningZoneString + " " + i.zonename;
        }
      }
      setZoneStateNow(zoneState);
      setDensity(arrDensity);
      setVisitor(arrVisitor);
      setZoneNamess(zoneNames);
      setDangerZone(dangerZoneString);
      setWarningZone(warningZoneString);
      setWarningState(warningZoneString);
      setDangerState(dangerZoneString);
    } catch (err) {
      console.error(err);
    }
  };

  const Map = () => {
    /**
 * 지도설정

 */
    //지도에 맵 올리기
    const mapConfig = () => {
      //getAPIdata();

      var locationss = [sessionStorage.getItem("lat"), sessionStorage.getItem("lon")];

      var zoom = Number(sessionStorage.getItem("zoom"));

      //var zone = new naver.maps.LatLng(locationss[0],locationss[1]);
      //var zone = new naver.maps.LatLng(Number(locationss[0]),Number(locationss[1]));
      //var zone = new naver.maps.LatLng(35.8373556,129.2160087);
      var zone = new naver.maps.LatLng(36.049563702921105, 129.40986360431268);

      if (!locationss[0]) {
        //var zone = new naver.maps.LatLng(35.8373556, 129.2160087);
        var zone = new naver.maps.LatLng(36.049563702921105, 129.40986360431268);
        zoom = 14;
      }

      //맵 설정
      var map1 = new naver.maps.Map("map1", {
        center: zone,
        zoom: 14,
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

      var HOME_PATH = window.HOME_PATH || ".";

      //폴리곤 넣기
      var polygon;
      for (let i of zoneStateNow) {
        if (
          i.zonename == "내연산/보경사" ||
          i.zonename == "해상스카이워크" ||
          i.zonename == "스페이스워크(환호공원)" ||
          i.zonename == "오어사" ||
          i.zonename == "구룡포 일본인가옥거리" ||
          i.zonename == "사방기념공원" ||
          i.zonename == "이가리 닻 전망대" ||
          i.zonename == "장기유배문화체험촌"
        ) {
          polygon = new naver.maps.Circle({
            map: map1,
            center: new naver.maps.LatLng(i.path[0], i.path[1]),
            radius: 200,
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
          continue;
        }
        //다각형 올리기
        else if (i.zonename == "호미곶 해맞이광장") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(36.07884320886685, 129.56685578641878),
              new naver.maps.LatLng(36.076408720031075, 129.56400206081256),
              new naver.maps.LatLng(36.07531309920946, 129.56552020200246),
              new naver.maps.LatLng(36.07640857418467, 129.56968434298437),
              new naver.maps.LatLng(36.07764977705318, 129.5702019824278),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "연오랑세오녀 테마공원(귀비고)") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(36.002102204308414, 129.45790409928676),
              new naver.maps.LatLng(36.00359003866928, 129.45894270122253),
              new naver.maps.LatLng(36.004201883151, 129.46205535752),
              new naver.maps.LatLng(36.0032803664344, 129.4628361315625),
              new naver.maps.LatLng(36.00219600592644, 129.46255291016513),
              new naver.maps.LatLng(36.00219600592644, 129.46255291016513),
              new naver.maps.LatLng(36.00091232773247, 129.4601290805384),
              new naver.maps.LatLng(36.00188883401706, 129.45776441737033),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "일월문화공원") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(35.965523500310766, 129.4276654006321),
              new naver.maps.LatLng(35.966854535305956, 129.42889761250945),
              new naver.maps.LatLng(35.966589669881685, 129.43018622401914),
              new naver.maps.LatLng(35.96582568075989, 129.43053962267635),
              new naver.maps.LatLng(35.96525696634421, 129.42903706631256),
              new naver.maps.LatLng(35.96517292962544, 129.42807027405118),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "송도송림테마거리(솔밭도시숲)") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(36.0458244787764, 129.37603380830043),
              new naver.maps.LatLng(36.04282311211135, 129.37654265353174),
              new naver.maps.LatLng(36.04017004615185, 129.37766099525328),
              new naver.maps.LatLng(36.03982507997331, 129.37415614703707),
              new naver.maps.LatLng(36.042076649665866, 129.3737467391077),
              new naver.maps.LatLng(36.04432448415675, 129.3739806628685),
              new naver.maps.LatLng(36.04555084873121, 129.3748384842778),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "송도해수욕장") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(36.04017004615185, 129.37766099525328),
              new naver.maps.LatLng(36.037121415174255, 129.37918890449347),
              new naver.maps.LatLng(36.03468309056069, 129.38083491483937),
              new naver.maps.LatLng(36.03189152200345, 129.38347959446008),
              new naver.maps.LatLng(36.03143040714407, 129.3822011652254),
              new naver.maps.LatLng(36.03436029716641, 129.3798490295907),
              new naver.maps.LatLng(36.038680578426984, 129.37734995294656),
              new naver.maps.LatLng(36.040022492169335, 129.376469543171),
              // new naver.maps.LatLng(, ),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "영일대해수욕장/해상누각") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
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
              // new naver.maps.LatLng(, ),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        }
      }

      //존이름 표시

      for (var i of zoneStateNow) {
        var text = new naver.maps.Marker({
          map: map1,
          position: new naver.maps.LatLng(i.textlocation[0], i.textlocation[1]),
          title: i.zonename,
          icon: {
            content: '<div style="text-align:center; font-size:13pt; color:' + i.polygoncolor + '; font-weight:bolder; text-shadow:1px 1px 1px #000;">' + i.zonename + "</div>",
          },
        });
      }
    };

    useEffect(() => {
      // API 새로 고침할때마다 지도 다시 그려줌
      mapConfig();
    }, [visitor]);

    return (
      <>
        <Script type={"text/javascript"} src={"https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=t0gdynkrzk&submodules=visualization"} onReady={mapConfig}></Script>{" "}
        <Mapp>
          <div id="map1" className="map"></div>
        </Mapp>
      </>
    );
  };

  const Home = () => {
    // const onClickZones = () => {
    //   setOnOffZone((prevState) => !prevState); // 상태 토글 방식 개선
    // };

    // const onClickZoneYeongilBeach = (e) => {
    //   //영일대해수욕장
    //   zonePoss(36.058801384637334, 129.3811164014791, 16);
    // };
    // const onClickZoneYeongilSpace = (e) => {
    //   //스페이스워크(환호공원)
    //   zonePoss(36.065877721069505, 129.39291799678568, 17);
    // };
    // const onClickZoneYeongilSky = (e) => {
    //   //해상스카이워크
    //   zonePoss(36.07232550155056, 129.41323419834518, 18);
    // };
    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    return (
      <Background>
        <div className="lightback">
          <Header />
          <Nav value={"3"} bottomValue={"7"} />

          <div className="iframeBox">
            {/* <button className={onOffZone ? "tourOff" : "tourOn"} onClick={onClickZones}>
              zone(영일대)
            </button>{" "}
            {onOffZone && (
              <div className="buttons">
                <button className="button red" onClick={onClickZoneYeongilBeach}>
                  1
                </button>
                <button className="button or" onClick={onClickZoneYeongilSpace}>
                  2
                </button>
                <button className="button yl" onClick={onClickZoneYeongilSky}>
                  3
                </button>
              </div>
            )} */}
            <Map className="iframe" />
          </div>
          <div className="infopng">
            <Image src={infopng} alt="123" width={300} height={30} />
          </div>
          <div className="overlay">
            <div className="overlaydash">
              <div>
                <div className="infotitle">
                  <Image src={charticon} width={15} height={15} /> 구역별 현재 다중밀집도
                </div>
                <div className="infoexplain">
                  {" "}
                  <Image src={redcircle} width={10} height={10} /> 고위험 <Image src={orangecircle} width={10} height={10} /> 위험 <Image src={greencircle} width={10} height={10} /> 보통{" "}
                  <Image src={bluecircle} width={10} height={10} /> 안전
                </div>
                <BarChart className="chart" datas={density} daylabel={zoneNamess} />
                <div className="infotitle">
                  <Image src={charticon} width={15} height={15} /> 구역별 실시간 방문객{" "}
                </div>
                <DoughnutChart className="doughnutChart" datas={visitor} label={zoneNamess} />
              </div>
            </div>
          </div>
          <div>
            {warningState ? (
              <div className="popup location1">
                <div className="warnings">
                  <Image src={warning} alt="123" width={240} height={70} />
                </div>{" "}
                {warningZone} 인원이 많습니다.{" "}
              </div>
            ) : (
              ""
            )}
            {dangerState ? (
              <div className="popup location2">
                <div className="warnings">
                  <Image src={danger} alt="123" width={240} height={70} />
                </div>{" "}
                {dangerZone} 인원이 너무 많습니다.
              </div>
            ) : (
              ""
            )}
          </div>
          {/* {warningState1 ? <div className="popup location1" onClick={openCloseWarning1}><div className='warnings' ><Image src={warning} alt='123' width={240} height={70} /></div>후문 구역 인원이 너무 많습니다.</div> : ''}
            {warningState2 ? <div className="popup location2" onClick={openCloseWarning2}><div className='warnings' ><Image src={warning} alt='123' width={240} height={70} /></div>중앙 구역 인원이 너무 많습니다.</div> : ''}         
            {warningState3 ? <div className="popup location3" onClick={openCloseWarning3}><div className='warnings' ><Image src={warning} alt='123' width={240} height={70} /></div>정문 구역 인원이 너무 많습니다.</div> : ''}  
            {dangerState1 ? <div className="popup location1" onClick={openCloseDanger1}><div className='warnings' ><Image src={danger} alt='123' width={240} height={70} /></div>후문 구역 인원이 너무 많습니다.</div> : ''}
            {dangerState2 ? <div className="popup location2" onClick={openCloseDanger2}><div className='warnings' ><Image src={danger} alt='123' width={240} height={70} /></div>중앙 구역 인원이 너무 많습니다.</div> : ''}         
            {dangerState3 ? <div className="popup location3" onClick={openCloseDanger3}><div className='warnings' ><Image src={danger} alt='123' width={240} height={70} /></div>정문 구역 인원이 너무 많습니다.</div> : ''}                                 */}
        </div>
      </Background>
    );
  };

  useEffect(() => {
    getAPIdata();
    let id = setInterval(getAPIdata, 300000);

    return () => clearInterval(id);
  }, []);

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
