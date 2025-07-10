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

import Header from "../../components/common/StoneHeader";
import Nav from "../../components/common/StoneNav";
import DoughnutChart from "../../components/charts/densityDoughnutChart";
import BarChart from "../../components/charts/densityBarChart";
import charticon from "../../public/images/chart_icon.png";
import redcircle from "../../public/images/redcircle.png";
import orangecircle from "../../public/images/orangecircle.png";
import greencircle from "../../public/images/greencircle.png";
import bluecircle from "../../public/images/bluecircle.png";
import infopng from "../../public/images/infopng.png";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import { LOAD_ZONELISTS_REQUEST, LOAD_SCANNERLISTS_REQUEST, LOAD_ZONELISTS_STONE_REQUEST, LOAD_SCANNERLISTS_STONE_REQUEST } from "../../reducers/scanner";
import wrapper from "../../store/configureStore";
import Script from "next/script";
import styled from "styled-components";

//지도 css
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
    top: 100px;
    right: 0;
    display: grid;
    width: 425px;
    height: 820px;
    background: rgba(255,255,255,0.9);  
  }
  .overlaydash {
    width: 450px;
    height: 820px;
    right: 0;
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
    font-weight:bolder;
    font-size: 13.5pt;
    color: #303030;
    text-align: center;
  }

  .infoexplain {
    margin-top: 15px;
    margin-left : 40px;
    font-size: 10pt;
  }

  .popup {
    position:absolute;       
    width: 320px;
    height: 310px;
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
    top:460px;
    left: 20px;
  }

  .location2 {
    top:120px;
    left: 20px;
  }

  .warnings {
    margin : 20px 10px 30px 50px;
  }

  .infopng {
    position:absolute;
    top:150px;
    right: 450px;
  }


`;

const Dash = () => {
  const dispatch = useDispatch();
  const [density, setDensity] = useState([0, 0, 0]); //밀집도
  const [visitor, setVisitor] = useState([0, 0, 0]); //방문객
  const [zoneNamess, setZoneNamess] = useState(["대릉원 후문", "대릉원 중심", "대릉원 정문", "동궁과월지", "첨성대", "경주국립박물관", "연꽃단지"]);
  const [warningState, setWarningState] = useState(false); //경고창 상태 후문
  const [dangerState, setDangerState] = useState(false); //위험창 상태
  const [warningZone, setWarningZone] = useState(""); //경고창 상태 후문
  const [dangerZone, setDangerZone] = useState(""); //위험창 상태
  const [warningZoneList, setWarningZoneList] = useState(""); //경고창 상태 후문
  const [dangerZoneList, setDangerZoneList] = useState(""); //위험창 상태
  const polygonColors = ["rgb(225, 0, 0)", "rgb(225, 192, 0)", "rgb(0, 176, 80)", "rgb(0, 112, 192)"]; // 폴리곤 색상

  const zoneState = [
    {
      zonename: "벚꽃놀이터",
      zone: "벚꽃놀이터",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.80314, 129.203376],
      textlocation: [35.839983, 129.213788],
      timeTemp: "2024-01-01T00:00:00", //최신시간을 가져오기위해
    },
    {
      zonename: "FnB",
      zone: "FnB",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.837862, 129.210646],
      textlocation: [35.83931322171628, 129.21385883254037],
      timeTemp: "2024-01-01T00:00:00", //최신시간을 가져오기위해
    },
    {
      zonename: "프리마켓",
      zone: "프리마켓",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.836395, 129.212243],
      textlocation: [35.83772203803926, 129.21407106721045],
      timeTemp: "2024-01-01T00:00:00", //최신시간을 가져오기위해
    },
    {
      zonename: "친환경 쉼터",
      zone: "친환경 쉼터",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.835676, 129.226047],
      textlocation: [35.83696506510836, 129.214442853139],
      timeTemp: "2024-01-01T00:00:00", //최신시간을 가져오기위해
    },
    {
      zonename: "라이트쇼",
      zone: "라이트쇼",
      warning: false,
      danger: false,
      polygoncolor: polygonColors[3],
      density: 0,
      visitor: 0,
      path: [35.834525, 129.218688],
      textlocation: [35.83595133707295, 129.21579133729636],
      timeTemp: "2024-01-01T00:00:00", //최신시간을 가져오기위해
    },
  ];

  const [zoneStateNow, setZoneStateNow] = useState(zoneState);

  //const audio = new Audio('../../public/sound/danger.wav');

  const { me } = useSelector((state) => state.auth);
  const { zonedatas } = useSelector((state) => state.scanner);

  const getAPIdata = async () => {
    const densityStandard = [0.6, 0.5, 0.2];
    // const densityStandard = [0.03, 10, 10]; //테스트용

    /**
     * 밀집도 가져오기 고위험 >= 10 > 위험 >= 6 > 주의 >= 2 > 정상
     */
    try {
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DensityZone`);

      let arrDensity = []; // 초기화
      let arrVisitor = []; // 초기화
      let zoneNames = [];
      let warningZoneLists = [];
      let dangerZoneLists = [];
      let warningst = false;
      let dangerst = false;

      // 실시간 방문객 가져오기
      for (let i of responseToday.data) {
        for (let j of zoneState) {
          if (i.zone_id == j.zone && i.time > j.timeTemp) {
            //최근시간일때만 돌아가게 수정
            j.density = i.density;
            j.visitor = i.visitor;
            j.timeTemp = i.time;
            //console.log('확인',i.zone, i.time , j.zone)

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
          dangerZoneLists.push(i.zonename); // 존별로 줄바꿈을 하기 위해 리스트로 저장
          dangerst = true;
        } else if (i.warning) {
          warningZoneLists.push(i.zonename); // 존별로 줄바꿈을 하기 위해 리스트로 저장
          warningst = true;
        }
      }
      setZoneStateNow(zoneState);
      setDensity(arrDensity);
      setVisitor(arrVisitor);
      setZoneNamess(zoneNames);
      setWarningState(warningst);
      setDangerState(dangerst);
      setDangerZoneList(dangerZoneLists);
      setWarningZoneList(warningZoneLists);
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
      var zone = new naver.maps.LatLng(35.8385002827302, 129.21562213986394);

      if (!locationss[0]) {
        //var zone = new naver.maps.LatLng(35.8373556, 129.2160087);
        var zone = new naver.maps.LatLng(35.8385002827302, 129.21562213986394);
        zoom = 17;
      }

      //맵 설정
      var map1 = new naver.maps.Map("map1", {
        center: zone,
        zoom: 17,
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
        //다각형 올리기
        if (i.zonename == "벚꽃놀이터") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(35.84030532350763, 129.2133782823704),
              new naver.maps.LatLng(35.84043490520969, 129.21382515258083),
              new naver.maps.LatLng(35.84028490520969, 129.2137315258083),
              new naver.maps.LatLng(35.83954575206978, 129.21377554864182),
              new naver.maps.LatLng(35.83957183372683, 129.21358261959261),
              new naver.maps.LatLng(35.84013183372683, 129.21355261959261),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "FnB") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(35.83957183372683, 129.21358261959261),
              new naver.maps.LatLng(35.83954575206978, 129.21377554864182),
              new naver.maps.LatLng(35.8381345044748, 129.21383591210775),
              new naver.maps.LatLng(35.83812517423062, 129.21363880498008),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "프리마켓") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(35.83812517423062, 129.21363880498008),
              new naver.maps.LatLng(35.8381345044748, 129.21383591210775),
              new naver.maps.LatLng(35.8380345044748, 129.21384591210775),
              new naver.maps.LatLng(35.837781671584714, 129.21392103204435),
              new naver.maps.LatLng(35.837221671584714, 129.21420103204435),
              new naver.maps.LatLng(35.83717631865474, 129.2140230261333),
              new naver.maps.LatLng(35.83757631865474, 129.2138130261333),
              new naver.maps.LatLng(35.83797631865474, 129.2136630261333),
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "친환경 쉼터") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
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
            ]),
            fillColor: i.polygoncolor,
            fillOpacity: 0.3,
            strokeColor: i.polygoncolor,
            strokeOpacity: 0.6,
            strokeWeight: 3,
          });
        } else if (i.zonename == "라이트쇼") {
          polygon = new naver.maps.Polygon({
            map: map1,
            paths: (i.path = [
              new naver.maps.LatLng(35.8360746007862, 129.21491560323577),
              new naver.maps.LatLng(35.83621174398843, 129.21499520263916),
              new naver.maps.LatLng(35.8361638060245, 129.21505349039943),
              new naver.maps.LatLng(35.83584038060245, 129.21565349039943),
              new naver.maps.LatLng(35.83564038060245, 129.21595349039943),
              new naver.maps.LatLng(35.83547917079785, 129.216130096306),
              new naver.maps.LatLng(35.83540416942607, 129.2159755826026),
              new naver.maps.LatLng(35.83548856160614, 129.21590105248642),
              new naver.maps.LatLng(35.83570856160614, 129.21559105248642),
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
    useEffect(() => {
      if (!(me && me.id)) {
        Router.replace("/login");
      }
    }, [me && me.id]);

    return (
      <Background>
        <div className="lightback">
          <Header />
          <Nav value={"1"} bottomValue={"7"} />
          <div className="iframeBox">
            <Map className="iframe" />
          </div>
          <div className="infopng">
            <Image src={infopng} alt="123" width={300} height={30} />
          </div>
          <div className="overlay">
            <div className="overlaydash">
              <div>
                <div className="infotitle">
                  <Image src={charticon} width={10} height={10} /> 구역별 현재 다중밀집도
                </div>
                <div className="infoexplain">
                  {" "}
                  <Image src={redcircle} width={10} height={10} /> 고위험 <Image src={orangecircle} width={10} height={10} /> 위험 <Image src={greencircle} width={10} height={10} /> 보통{" "}
                  <Image src={bluecircle} width={10} height={10} /> 안전
                </div>
                <BarChart className="chart" datas={density} daylabel={zoneNamess} />
                <div className="infotitle">
                  <Image src={charticon} width={10} height={10} /> 구역별 실시간 방문객{" "}
                </div>
                <DoughnutChart className="chart" datas={visitor} label={zoneNamess} />
              </div>
            </div>
          </div>
          <div>
            {/* 존 구분을 쉽게하기위해 줄바꿈을 넣음*/}
            {warningState ? (
              <div className="popup location1">
                <div className="warnings">
                  <Image src={warning} alt="123" width={240} height={70} />
                </div>{" "}
                {warningZoneList.map((zone) => (
                  <a>
                    {zone}
                    <br />
                  </a>
                ))}
                인원이 많습니다.{" "}
              </div>
            ) : (
              ""
            )}
            {dangerState ? (
              <div className="popup location2">
                <div className="warnings">
                  <Image src={danger} alt="123" width={240} height={70} />
                </div>{" "}
                {dangerZoneList.map((zone) => (
                  <a>
                    {zone}
                    <br />
                  </a>
                ))}{" "}
                인원이 너무 많습니다.
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
    let id = setInterval(getAPIdata, 60000);

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
