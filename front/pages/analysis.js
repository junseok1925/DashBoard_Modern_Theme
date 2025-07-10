import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Image from "next/image";

import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Status from "../components/info/Status";
import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import wrapper from "../store/configureStore";
import Chart from "../components/charts/analysisChart";
import todayicon from "../public/images/top_analysis_icon2.png";
import stackicon from "../public/images/top_analysis_icon3.png";
import currenticon from "../public/images/top_analysis_icon4.png";
import reicon from "../public/images/top_analysis_icon5.png";

const Background = styled.div`
 // font 전역 설정
  font-family: "Pretendard", sans-serif;

  .lightback { 
    background-color: #12121e;
    position: relative; 
    z-index: 0; 

  .nav {
    position: relative; 
    z-index: 1;
  }

  .total_graph_view {
    width: 49.4%;
    margin: 5px 5px 5px 5px;
    border-radius: 5px;
    //box-shadow: 0px 0px 5px #cccccc;
  }
  .pos_left {
    float: left;
    margin: 5px 0 0 7px;
  }
  .pos_right {
    float: right;
    margin: 5px 5px 0 0;
  }

  .pos_right2 {
    float: left;
    margin: 5px 5px 0 1%;
  }

  .total_graph_box_title {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #2D2D42;
    font-weight: 600;
    font-size: 20px;
    border-radius: 5px 5px 0 0;
    border-bottom: solid 1px #e4e4e4;
    text-align: left;
    color: white;
    align-items: center;
  } 
  .img {
    margin-top: 100px;
  }

  .fpa_graph_box_title .title {
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    margin-top: 7px;
  }

  .total_graph {
    background-color: #2D2D42;
    border-radius: 0 0 5px 5px;
    padding: 10px 5px 0 0;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chartForm {
    display: grid;
    grid-template-columns: 1fr 10fr;
  }

  .chartZone {
    text-align: center;
  }

  .chartZoneButton {
    border-radius: 5px;
    border: 0;
    display: inline-block;
    color: #b6b6d3;
    font-weight: 600;
    font-size: 16px;
    padding: 5px;
    width: 140px;
    margin: 4.5px;
    text-align: center;
    background: #2d2d42
  }
  .chartZoneButton:hover,
  .chartZoneButton:active,
  .chartZoneButton:focus{
      background:#4077f8;
      color: white;
  }

 
  .chart {
    width: 99%;
    height: 100%;
    // margin-left: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .darkback {
    background-color: #1b2137;
    height: 940px;
    color: white;

    .total_graph_box_title {
      background-color: #3c496e;
      border-radius: 5px 5px 0 0;
      border-bottom: solid 0px #e4e4e4;
      color: white;
    }

    .total_graph {
      background-color: #354060;
    }

    .total_graph_view {
      box-shadow: 0px 0px 0px;
    }
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { me, yearFirst, today, firstday } = useSelector((state) => state.auth);

  // 영일대
  const [todayVisitorGraphYeongil, setTodayVisitorGraphYeongil] = useState([0, 0, 0]);
  const [stackVisitorGraphYeongil, setStackVisitorGraphYeongil] = useState([0, 0, 0]);
  const [advVisitTimeGraphYeongil, setAdvVisitTimeGraphYeongil] = useState([0, 0, 0]);
  const [reVisitGraphYeongil, setReVisitGraphYeongil] = useState([0, 0, 0, 0]);

  //송도
  const [todayVisitorGraphSongdo, setTodayVisitorGraphSongdo] = useState([0, 0]);
  const [stackVisitorGraphSongdo, setStackVisitorGraphSongdo] = useState([0, 0]);
  const [advVisitTimeGraphSongdo, setAdvVisitTimeGraphSongdo] = useState([0, 0]);
  const [reVisitGraphSongdo, setReVisitGraphSongdo] = useState([0, 0]);

  //이가리
  const [todayVisitorGraphLigari, setTodayVisitorGraphLigari] = useState([0, 0]);
  const [stackVisitorGraphLigari, setStackVisitorGraphLigari] = useState([0, 0]);
  const [advVisitTimeGraphLigari, setAdvVisitTimeGraphLigari] = useState([0, 0]);
  const [reVisitGraphLigari, setReVisitGraphLigari] = useState([0, 0]);

  //보경사
  const [todayVisitorGraphBogyeongTmp, setTodayVisitorGraphBogyeongTmp] = useState([0]);
  const [stackVisitorGraphBogyeongTmp, setStackVisitorGraphBogyeongTmp] = useState([0]);
  const [advVisitTimeGraphBogyeongTmp, setAdvVisitTimeGraphBogyeongTmp] = useState([0]);
  const [reVisitGraphBogyeongTmp, setReVisitGraphBogyeongTmp] = useState([0]);

  //남포항
  const [todayVisitorGraphNampo, setTodayVisitorGraphNampo] = useState([0, 0, 0]);
  const [stackVisitorGraphNampo, setStackVisitorGraphNampo] = useState([0, 0, 0]);
  const [advVisitTimeGraphNampo, setAdvVisitTimeGraphNampo] = useState([0, 0, 0]);
  const [reVisitGraphNampo, setReVisitGraphNampo] = useState([0, 0, 0]);

  //호미곶면
  const [todayVisitorGraphHomigot, setTodayVisitorGraphHomigot] = useState([0, 0, 0]);
  const [stackVisitorGraphHomigot, setStackVisitorGraphHomigot] = useState([0, 0, 0]);
  const [advVisitTimeGraphHomigot, setAdvVisitTimeGraphHomigot] = useState([0, 0, 0]);
  const [reVisitGraphHomigot, setReVisitGraphHomigot] = useState([0, 0, 0]);

  //차트관련
  const Yeongil = ["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"];
  const Songdo = ["송도해수욕장", "송도송림테마거리(솔밭도시숲)"];
  const Ligari = ["이가리 닻 전망대", "사방기념공원"];
  const BogyeongTmp = ["내연산/보경사"];
  const Homigot = ["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"];
  const Nampo = ["오어사", "일월문화공원", "장기유배문화체험촌"];
  const zoneNampo = ["첨성대존", "국립경주박물관", "연꽃단지"];

  const zoneYeongil = ["황리단길 권역", "동부사적지 권역", "불국사 권역", "경주 대릉원", "동궁과월지존", "사적관리존", "신경주역 일대", "보문단지 일대", "동부해안가 일대"];

  const [label, setLabel] = useState(Yeongil); //x축
  const [todayVisitorGraph, setTodayVisitorGraph] = useState(todayVisitorGraphYeongil);
  const [stackVisitorGraph, setStackVisitorGraph] = useState(stackVisitorGraphYeongil);
  const [advVisitTimeGraph, setAdvVisitTimeGraph] = useState(advVisitTimeGraphYeongil);
  const [reVisitGraph, setReVisitGraph] = useState(reVisitGraphYeongil);

  const getAPIdata = async () => {
    // 데이터 받아오기
    /**
     * 오늘자 방문객 그래프
     */
    try {
      // const responseToday = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`
      // );

      const responseToday = await axios.get(`http://14.63.184.15:8000/v1/POHANG_TOURISM/DeviceCountHourly`);

      let arrYeongil = [0, 0, 0];
      let arrSongdo = [0, 0];
      let arrLigari = [0, 0];
      let arrBogyeongTmp = [0];
      let arrHomigot = [0, 0, 0];
      let arrNampo = [0, 0, 0];

      for (let i of responseToday.data) {
        if (i.zone === Yeongil[0]) {
          //영일대 권역
          arrYeongil[0] = i.data;
        } else if (i.zone === Yeongil[1]) {
          arrYeongil[1] = i.data;
        } else if (i.zone === Yeongil[2]) {
          arrYeongil[2] = i.data;
        } else if (i.zone === Songdo[0]) {
          // 송도 권역
          arrSongdo[0] = i.data;
        } else if (i.zone === Songdo[1]) {
          arrSongdo[1] = i.data;
        } else if (i.zone === Ligari[0]) {
          // 이가리 권역
          arrLigari[0] = i.data;
        } else if (i.zone === Ligari[1]) {
          arrLigari[1] = i.data;
        } else if (i.zone === BogyeongTmp[0]) {
          // 보경사 권역
          arrBogyeongTmp[0] = i.data;
        } else if (i.zone === Homigot[0]) {
          // 호미곶 권역
          arrHomigot[0] = i.data;
        } else if (i.zone === Homigot[1]) {
          arrHomigot[1] = i.data;
        } else if (i.zone === Homigot[2]) {
          arrHomigot[2] = i.data;
        } else if (i.zone === Nampo[0]) {
          // 남포항 권역
          arrNampo[0] = i.data;
        } else if (i.zone === Nampo[1]) {
          arrNampo[1] = i.data;
        } else if (i.zone === Nampo[2]) {
          arrNampo[2] = i.data;
        }
      }
      //오늘자 방문객 수
      setTodayVisitorGraphYeongil([arrYeongil[0], arrYeongil[1], arrYeongil[2]]);
      setTodayVisitorGraphSongdo([arrSongdo[0], arrSongdo[1]]);
      setTodayVisitorGraphLigari([arrLigari[0], arrLigari[1]]);
      setTodayVisitorGraphBogyeongTmp([arrBogyeongTmp[0]]);
      setTodayVisitorGraphNampo([arrNampo[0], arrNampo[1], arrNampo[2]]);
      setTodayVisitorGraphHomigot([arrHomigot[0], arrHomigot[1], arrHomigot[2]]);
    } catch (err) {
      console.error(err);
    }
    /**
     * 이달의 누적 방문객 그래프
     */
    try {
      const responseYesterdayStack = await axios.get(`http://14.63.184.15:8000/v1/POHANG_TOURISM/DeviceCountDay?from=${firstday}&to=${today}`);
      console.log(`http://14.63.184.15:8000/v1/POHANG_TOURISM/DeviceCountDay?from=${firstday}&to=${today}`);
      // `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${firstday}&to=${today}`
      //const responseYesterdayStack = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${yearFirst}&to=${today}`);
      let arrYeongil = [0, 0, 0];
      let arrSongdo = [0, 0];
      let arrLigari = [0, 0];
      let arrBogyeongTmp = [0];
      let arrHomigot = [0, 0, 0];
      let arrNampo = [0, 0, 0];

      for (let i of responseYesterdayStack.data) {
        if (i.zone === Yeongil[0]) {
          // 영일대 권역
          arrYeongil[0] = arrYeongil[0] + i.data;
        } else if (i.zone === Yeongil[1]) {
          arrYeongil[1] = arrYeongil[1] + i.data;
        } else if (i.zone === Yeongil[2]) {
          arrYeongil[2] = arrYeongil[2] + i.data;
        } else if (i.zone === Songdo[0]) {
          arrSongdo[0] = arrSongdo[0] + i.data;
        } else if (i.zone === Songdo[1]) {
          arrSongdo[1] = arrSongdo[1] + i.data;
        } else if (i.zone === Ligari[0]) {
          arrLigari[0] = arrLigari[0] + i.data;
        } else if (i.zone === Ligari[1]) {
          arrLigari[1] = arrLigari[1] + i.data;
        } else if (i.zone === BogyeongTmp[0]) {
          arrBogyeongTmp[0] = arrBogyeongTmp[0] + i.data;
        } else if (i.zone === Homigot[0]) {
          arrHomigot[0] = arrHomigot[0] + i.data;
        } else if (i.zone === Homigot[1]) {
          arrHomigot[1] = arrHomigot[1] + i.data;
        } else if (i.zone === Homigot[2]) {
          arrHomigot[2] = arrHomigot[2] + i.data;
        } else if (i.zone === Nampo[0]) {
          // 남포항 권역
          arrNampo[0] = arrNampo[0] + Number(i.data);
        } else if (i.zone === Nampo[1]) {
          arrNampo[1] = arrNampo[1] + Number(i.data);
        } else if (i.zone === Nampo[2]) {
          arrNampo[2] = arrNampo[2] + Number(i.data);
        }
      }

      setStackVisitorGraphYeongil([arrYeongil[0], arrYeongil[1], arrYeongil[2]]);
      setStackVisitorGraphSongdo([arrSongdo[0], arrSongdo[1]]);
      setStackVisitorGraphLigari([arrLigari[0], arrLigari[1]]);
      setStackVisitorGraphBogyeongTmp([arrBogyeongTmp[0]]);
      setStackVisitorGraphNampo([arrNampo[0], arrNampo[1], arrNampo[2]]);
      setStackVisitorGraphHomigot([arrHomigot[0], arrHomigot[1], arrHomigot[2]]);
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류시간 그래프
     */
    try {
      const responseTime = await axios.get(
        `http://14.63.184.15:8000/v1/POHANG_TOURISM/DeviceResidenceTime`
        // `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime`
      );
      //const responseTime = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);

      let arrYeongil = [0, 0, 0];
      let arrSongdo = [0, 0];
      let arrLigari = [0, 0];
      let arrBogyeongTmp = [0];
      let arrHomigot = [0, 0, 0];
      let arrNampo = [0, 0, 0];

      for (let i of responseTime.data) {
        // 영일대 권역
        if (i.zone === Yeongil[0]) {
          //영일대 권역
          arrYeongil[0] = i.data;
        } else if (i.zone === Yeongil[1]) {
          arrYeongil[1] = i.data;
        } else if (i.zone === Yeongil[2]) {
          arrYeongil[2] = i.data;
        } else if (i.zone === Songdo[0]) {
          // 송도 권역
          arrSongdo[0] = i.data;
        } else if (i.zone === Songdo[1]) {
          arrSongdo[1] = i.data;
        } else if (i.zone === Ligari[0]) {
          // 이가리 권역
          arrLigari[0] = i.data;
        } else if (i.zone === Ligari[1]) {
          arrLigari[1] = i.data;
        } else if (i.zone === BogyeongTmp[0]) {
          // 보경사 권역
          arrBogyeongTmp[0] = i.data;
        } else if (i.zone === Homigot[0]) {
          // 호미곶 권역
          arrHomigot[0] = i.data;
        } else if (i.zone === Homigot[1]) {
          arrHomigot[1] = i.data;
        } else if (i.zone === Homigot[2]) {
          arrHomigot[2] = i.data;
        } else if (i.zone === Nampo[0]) {
          // 남포항 권역
          arrNampo[0] = i.data;
        } else if (i.zone === Nampo[1]) {
          arrNampo[1] = i.data;
        } else if (i.zone === Nampo[2]) {
          arrNampo[2] = i.data;
        }
      }

      let chartDatasYeongil = [Math.round(arrYeongil[0] / 60), Math.round(arrYeongil[1] / 60), Math.round(arrYeongil[2] / 60)];
      let chartDatasSongdo = [Math.round(arrSongdo[0] / 60), Math.round(arrSongdo[1] / 60)];
      let chartDatasLigari = [Math.round(arrLigari[0] / 60), Math.round(arrLigari[1] / 60)];
      let chartDatas = [Math.round(arrYeongil[0] / 60), Math.round(arrYeongil[1] / 60), Math.round(arrYeongil[2] / 60)];

      let chartDatasBogyeongTmp = [Math.round(arrBogyeongTmp / 60)];

      let chartDatasNampo = [Math.round(arrNampo[0] / 60), Math.round(arrNampo[1] / 60), Math.round(arrNampo[2] / 60)];

      let chartDatasHomigot = [Math.round(arrHomigot[0] / 60), Math.round(arrHomigot[1] / 60), Math.round(arrHomigot[2] / 60)];

      setAdvVisitTimeGraphYeongil(chartDatasYeongil);
      setAdvVisitTimeGraphSongdo(chartDatasSongdo);
      setAdvVisitTimeGraphLigari(chartDatasLigari);
      setAdvVisitTimeGraphBogyeongTmp(chartDatasBogyeongTmp);
      setAdvVisitTimeGraphNampo(chartDatasNampo);
      setAdvVisitTimeGraphHomigot(chartDatasHomigot);
    } catch (err) {
      console.error(err);
    }

    /**
     * 재방문 그래프
     */
    try {
      const responseRevisit = await axios.get(
        `http://14.63.184.15:8000/v1/POHANG_TOURISM/DeviceCountRevisit`
        // `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit`
      );
      //const responseRevisit = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit`);

      let arrYeongil = [0, 0, 0];
      let arrSongdo = [0, 0];
      let arrLigari = [0, 0];
      let arrBogyeongTmp = [0];
      let arrHomigot = [0, 0, 0];
      let arrNampo = [0, 0, 0];

      for (let i of responseRevisit.data) {
        if (i.zone === Yeongil[0]) {
          //영일대 권역
          arrYeongil[0] = i.data;
        } else if (i.zone === Yeongil[1]) {
          arrYeongil[1] = i.data;
        } else if (i.zone === Yeongil[2]) {
          arrYeongil[2] = i.data;
        } else if (i.zone === Songdo[0]) {
          // 송도 권역
          arrSongdo[0] = i.data;
        } else if (i.zone === Songdo[1]) {
          arrSongdo[1] = i.data;
        } else if (i.zone === Ligari[0]) {
          // 이가리 권역
          arrLigari[0] = i.data;
        } else if (i.zone === Ligari[1]) {
          arrLigari[1] = i.data;
        } else if (i.zone === BogyeongTmp[0]) {
          // 보경사 권역
          arrBogyeongTmp[0] = i.data;
        } else if (i.zone === Homigot[0]) {
          // 호미곶 권역
          arrHomigot[0] = i.data;
        } else if (i.zone === Homigot[1]) {
          arrHomigot[1] = i.data;
        } else if (i.zone === Homigot[2]) {
          arrHomigot[2] = i.data;
          // 남포항 권역
        } else if (i.zone === Nampo[0]) {
          arrNampo[0] = i.data;
        } else if (i.zone === Nampo[1]) {
          arrNampo[1] = i.data;
        } else if (i.zone === Nampo[2]) {
          arrNampo[2] = i.data;
        }
      }

      setReVisitGraphYeongil([arrYeongil[0], arrYeongil[1], arrYeongil[2]]);
      setReVisitGraphSongdo([arrSongdo[0], arrSongdo[1]]);
      setReVisitGraphLigari([arrLigari[0], arrLigari[1]]);
      setReVisitGraphBogyeongTmp([arrBogyeongTmp[0]]);
      setReVisitGraphNampo([arrNampo[0], arrNampo[1], arrNampo[2]]);
      setReVisitGraphHomigot([arrHomigot[0], arrHomigot[1], arrHomigot[2]]);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        getAPIdata();
      }, 2000);
    }
  };

  useEffect(() => {
    getAPIdata();
    // 30분마다 새로 고침 하여 데이터를 신규로 받아옴.
    // 30분 = 1800초 * 100 하여 밀리세컨단위로 변환 1800000
    setInterval(getAPIdata, 900000);
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  const onYeongil = () => {
    setLabel(Yeongil);
    setTodayVisitorGraph(todayVisitorGraphYeongil);
    setStackVisitorGraph(stackVisitorGraphYeongil);
    setAdvVisitTimeGraph(advVisitTimeGraphYeongil);
    setReVisitGraph(reVisitGraphYeongil);
  };

  const onBogyeongTmp = () => {
    setLabel(BogyeongTmp);
    setTodayVisitorGraph(todayVisitorGraphBogyeongTmp);
    setStackVisitorGraph(stackVisitorGraphBogyeongTmp);
    setAdvVisitTimeGraph(advVisitTimeGraphBogyeongTmp);
    setReVisitGraph(reVisitGraphBogyeongTmp);
  };

  const onHomigot = () => {
    setLabel(Homigot);
    setTodayVisitorGraph(todayVisitorGraphHomigot);
    setStackVisitorGraph(stackVisitorGraphHomigot);
    setAdvVisitTimeGraph(advVisitTimeGraphHomigot);
    setReVisitGraph(reVisitGraphHomigot);
  };

  const onSongdo = () => {
    setLabel(Songdo);
    setTodayVisitorGraph(todayVisitorGraphSongdo);
    setStackVisitorGraph(stackVisitorGraphSongdo);
    setAdvVisitTimeGraph(advVisitTimeGraphSongdo);
    setReVisitGraph(reVisitGraphSongdo);
  };
  const onLigari = () => {
    setLabel(Ligari);
    setTodayVisitorGraph(todayVisitorGraphLigari);
    setStackVisitorGraph(stackVisitorGraphLigari);
    setAdvVisitTimeGraph(advVisitTimeGraphLigari);
    setReVisitGraph(reVisitGraphLigari);
  };
  const onNampo = () => {
    setLabel(Nampo);
    setTodayVisitorGraph(todayVisitorGraphNampo);
    setStackVisitorGraph(stackVisitorGraphNampo);
    setAdvVisitTimeGraph(advVisitTimeGraphNampo);
    setReVisitGraph(reVisitGraphNampo);
  };

  return (
    <Background>
      <div className="lightback">
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
          <Header />
          <Nav value={"2"} />
          <Status theme="light" />
          {/* <Chart /> */}
          <div className="chartForm" onLoad={onYeongil}>
            <div className="chartZone">
              <button className="chartZoneButton zoneBt1" onClick={onYeongil}>
                영일대 권역
              </button>
              <button className="chartZoneButton zoneBt2" onClick={onBogyeongTmp}>
                보경사
              </button>
              <button className="chartZoneButton zoneBt3" onClick={onLigari}>
                이가리 권역
              </button>
              <button className="chartZoneButton zoneBt4" onClick={onHomigot}>
                <span style={{ fontSize: "1rem" }}>호미곶면 권역</span>
              </button>
              <button className="chartZoneButton zoneBt5" onClick={onSongdo}>
                <span style={{ fontSize: "0.9rem" }}>송도해수욕장 권역</span>
              </button>
              <button className="chartZoneButton zoneBt6" onClick={onNampo}>
                남포항 권역
              </button>
            </div>
            <div>
              {/* <!--오늘자 방문객--> */}
              <div className="total_graph_view pos_left">
                <div className="total_graph_box_title">
                  &nbsp;
                  <Image className="img" src={todayicon} alt="..." />
                  <span className="title">&nbsp;현재 방문객</span>
                </div>
                <div className="total_graph">
                  <div id="visit1" className="chart">
                    <Chart labels={label} label={"방문객수(명)"} datas={todayVisitorGraph} theme={me && me.theme === "dark" ? "dark" : "light"} />
                  </div>
                </div>
              </div>
              {/* <!--누적 방문객--> */}
              <div className="total_graph_view pos_right">
                <div className="total_graph_box_title">
                  &nbsp;
                  <Image className="img" src={stackicon} margin-top={10} alt="..." />
                  <span className="title">&nbsp;이달의 방문객</span>
                </div>
                <div className="total_graph">
                  <div id="visit2" className="chart">
                    <Chart labels={label} label={"방문객수(명)"} datas={stackVisitorGraph} theme={me && me.theme === "dark" ? "dark" : "light"} />
                  </div>
                </div>
              </div>
              {/* <!--체류시간&체류인원--> */}
              <div className="graph">
                <div className="total_graph_view pos_left">
                  <div className="total_graph_box_title">
                    &nbsp;
                    <Image className="img" src={currenticon} margin-top={10} alt="..." />
                    <span className="title">&nbsp;체류시간</span>
                  </div>
                  <div className="total_graph">
                    <div id="visit3" className="chart">
                      <Chart labels={label} label={"체류시간(분)"} datas={advVisitTimeGraph} theme={me && me.theme === "dark" ? "dark" : "light"} />
                    </div>
                  </div>
                </div>
                {/* <!--재방문객&재방문률--> */}
                <div className="total_graph_view pos_right">
                  <div className="total_graph_box_title">
                    &nbsp;
                    <Image className="img" src={reicon} margin-top={10} alt="..." />
                    <span className="title">&nbsp;전일 재방문객</span>
                  </div>
                  <div className="total_graph">
                    <div id="visit4" className="chart">
                      <Chart labels={label} label={"방문객수(명)"} datas={reVisitGraph} theme={me && me.theme === "dark" ? "dark" : "light"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
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
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
