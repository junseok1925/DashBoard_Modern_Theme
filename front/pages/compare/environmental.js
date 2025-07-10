import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { CSVLink, CSVDownload } from "react-csv";
import Head from "next/head";

import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import EnvInfo from "../../components/info/EnvInfo";
import EnvChart from "../../components/charts/envChart";
import EnvDustChart from "../../components/charts/envDustChart";
import EnvTvocChart from "../../components/charts/envTvoc";
import NavBottom from "../../components/common/NavBottom";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

const Background = styled.div`
  background-color: #f6f9fe;

  .Sel_date {
    width: 40%;
    background-color: white;
    box-shadow: 0px 0px 5px #cccccc;
    margin: 5px auto 5px auto;
    padding: 5px 0 5px 0;
    border-radius: 5px;
    text-align: center;
    color: black;
  }
  .button {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: white;
    font-size: 13px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 2px 4px 0px 4px;
    border-radius: 5px;
    background: #7b8df8;

    &:hover {
      background: #d59866;
    }
  }
  .compare_list {
    width: 100%;
    height: 100%;
    float: left;
    margin: 0 0 0 0;
    padding: 5px 10px 0 0;
  }
  .division {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    margin: 0 5% 0 5%;
  }
  .csv {
    color: white;
    text-decoration: none;
  }
  .envinfo {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr;
    margin: 0 0% 0 0%;
  }

  .fpa_graph_box_env {
    width: 100%;
    float: left;
    border-radius: 5px;
    margin: 0 0 0 0;
    box-shadow: 0px 0px 5px #ccc;
  }
  .fpa_graph_view_w100 {
    width: 99%;
    height: 25%;
    margin: 0 0 0 0;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
  }
  .pos_left {
    float: left;
    margin: 0px 0 0 7px;
  }
  .fpa_graph_box_title {
    width: 100%;
    height: 40px;
    border-radius: 5px 5px 0 0;
    text-align: left;
    color: gray;
    background-color: white;
  }
  .fpa_graph_box_title .title {
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    margin-top: 7px;
    margin-left: 20px;
    text-align: center;
  }
  .fpa_graph {
    background-color: white;
    border-radius: 0 0 5px 5px;
    padding: 20px 0px 0 0;
  }
  .fpa_graph_view_h50 {
    width: 49.2%;
    margin: 9px 0 0 0.4%;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
  }
  .pos_right2 {
    float: left;
    margin: 10px 0px 0 0.5%;
  }
  .visit {
    margin-left: 5px;
  }
  .darkback {
    background-color: #1b2137;

    .Sel_date {
      background-color: #3c496e;
      box-shadow: 0px 0px 0px #b1b1b1;
      color: white;
    }
    .csv {
      color: white;
      text-decoration: none;
    }
    .fpa_graph_box_env {
      box-shadow: 0px 0px 0px #ccc;
    }
    .fpa_graph_view_w100 {
      box-shadow: 0 0 0 #ccc;
    }
    .fpa_graph_box_title {
      color: #fff;
      background-color: #354060;
    }
    .fpa_graph_box_title .title {
      font-size: 18px;
      font-weight: 600;
    }
    .fpa_graph {
      background-color: #354060;
    }
  }
`;

const Environmental = () => {
  const { me, ago7day, today } = useSelector((state) => state.auth);
  const [sttdate, setSttdate] = useState(ago7day);
  const [enddate, setEnddate] = useState(today);
  const [zoneInfo1, setZoneInfo1] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo2, setZoneInfo2] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo3, setZoneInfo3] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo4, setZoneInfo4] = useState([0, 0, 0, 0, 0]);

  const [tempGraph, setTempGraph] = useState([]);
  const [humiGraph, sethumiGraph] = useState([]);
  const [dustGraph, setDustGraph] = useState([]);
  const [ultraDustGraph, setUltraDustGraph] = useState([]);
  const [tvocGraph, setTvocGraph] = useState([]);

  const [tempGraph2, setTempGraph2] = useState([]);
  const [humiGraph2, sethumiGraph2] = useState([]);
  const [dustGraph2, setDustGraph2] = useState([]);
  const [ultraDustGraph2, setUltraDustGraph2] = useState([]);
  const [tvocGraph2, setTvocGraph2] = useState([]);

  const [tempGraph3, setTempGraph3] = useState([]);
  const [humiGraph3, sethumiGraph3] = useState([]);
  const [dustGraph3, setDustGraph3] = useState([]);
  const [ultraDustGraph3, setUltraDustGraph3] = useState([]);
  const [tvocGraph3, setTvocGraph3] = useState([]);

  const [tempGraph4, setTempGraph4] = useState([]);
  const [humiGraph4, sethumiGraph4] = useState([]);
  const [dustGraph4, setDustGraph4] = useState([]);
  const [ultraDustGraph4, setUltraDustGraph4] = useState([]);
  const [tvocGraph4, setTvocGraph4] = useState([]);

  const [dateStr, setDateStr] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const zones = ["황리단길 중심거리 전체", "불국사존", "동부사적지 권역", "봉황대고분존"];

  const getAPIenv = async () => {
    // console.log("start");

    const temp_1 = [];
    const humid_1 = [];
    const pm10_1 = [];
    const pm2_5_1 = [];
    const tvoc_1 = [];
    const temp_2 = [];
    const humid_2 = [];
    const pm10_2 = [];
    const pm2_5_2 = [];
    const tvoc_2 = [];
    const temp_3 = [];
    const humid_3 = [];
    const pm10_3 = [];
    const pm2_5_3 = [];
    const tvoc_3 = [];
    const temp_4 = [];
    const humid_4 = [];
    const pm10_4 = [];
    const pm2_5_4 = [];
    const tvoc_4 = [];
    const period = [];
    const excels = [];

    try {
      const responseEnv = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/SensorDataDayAverage?from=${sttdate}&to=${enddate}`);
      //const responseEnv = await axios.get(`http://54.180.158.22:8000/v1/Gasi/SensorDataDayAverage?from=${sttdate}&to=${enddate}`);
      // console.log(responseEnv);
      var prei = {
        zone_id: 1901,
        temperature: 6.6,
        humidity: 91.3,
        pm10: 44,
        pm2_5: 39,
        tvoc: 1972,
        time: "2020-12-10T00:00:00.000Z",
      };
      var cnt = 0;
      var cnt1 = 0;
      var cnt2 = 0;
      var cnt3 = 0;
      var cnt4 = 0;

      for (let i of responseEnv.data) {
        if (i.zone === zones[0]) {
          //console.log(i.time.slice(0,10));
          if (i.time.slice(0, 10) !== prei.time.slice(0, 10)) {
            temp_1.push(Number(i.temperature));
            humid_1.push(Number(i.humidity));
            pm10_1.push(Number(i.pm10));
            pm2_5_1.push(Number(i.pm2_5));
            tvoc_1.push(Number(i.tvoc));
            period.push(i.time.slice(0, 10));
            //console.log('temp1', temp_1, i.temperature);
            //console.log('temp1', temp_1)
            cnt = cnt + 1;
          } else {
            temp_1[cnt - 1] = temp_1[cnt - 1] + Number(i.temperature);
            humid_1[cnt - 1] = humid_1[cnt - 1] + i.humidity;
            pm10_1[cnt - 1] = pm10_1[cnt - 1] + i.pm10;
            pm2_5_1[cnt - 1] = pm2_5_1[cnt - 1] + i.pm2_5;
            tvoc_1[cnt - 1] = tvoc_1[cnt - 1] + i.tvoc;
            //console.log(i);
          }
        }
        if (i.zone === zones[1]) {
          //console.log(i.time.slice(0,10));
          if (i.time.slice(0, 10) !== prei.time.slice(0, 10)) {
            temp_2.push(Number(i.temperature));
            humid_2.push(Number(i.humidity));
            pm10_2.push(Number(i.pm10));
            pm2_5_2.push(Number(i.pm2_5));
            tvoc_2.push(Number(i.tvoc));
            cnt1 = cnt1 + 1;
          } else {
            temp_2[cnt1 - 1] = temp_2[cnt1 - 1] + Number(i.temperature);
            humid_2[cnt1 - 1] = humid_2[cnt1 - 1] + i.humidity;
            pm10_2[cnt1 - 1] = pm10_2[cnt1 - 1] + i.pm10;
            pm2_5_2[cnt1 - 1] = pm2_5_2[cnt1 - 1] + i.pm2_5;
            tvoc_2[cnt1 - 1] = tvoc_2[cnt1 - 1] + i.tvoc;
            //console.log('t2',temp_2);
          }
        }
        if (i.zone === zones[2]) {
          //console.log(i.time.slice(0,10));
          if (i.time.slice(0, 10) !== prei.time.slice(0, 10)) {
            temp_3.push(Number(i.temperature));
            humid_3.push(Number(i.humidity));
            pm10_3.push(Number(i.pm10));
            pm2_5_3.push(Number(i.pm2_5));
            tvoc_3.push(Number(i.tvoc));
            cnt2 = cnt2 + 1;
          } else {
            temp_3[cnt2 - 1] = temp_3[cnt2 - 1] + Number(i.temperature);
            humid_3[cnt2 - 1] = humid_3[cnt2 - 1] + i.humidity;
            pm10_3[cnt2 - 1] = pm10_3[cnt2 - 1] + i.pm10;
            pm2_5_3[cnt2 - 1] = pm2_5_3[cnt2 - 1] + i.pm2_5;
            tvoc_3[cnt2 - 1] = tvoc_3[cnt2 - 1] + i.tvoc;
            //console.log(i);
          }
        }
        if (i.zone === zones[3]) {
          //console.log(i.time.slice(0,10));
          if (i.time.slice(0, 10) !== prei.time.slice(0, 10)) {
            temp_4.push(Number(i.temperature));
            humid_4.push(Number(i.humidity));
            pm10_4.push(Number(i.pm10));
            pm2_5_4.push(Number(i.pm2_5));
            tvoc_4.push(Number(i.tvoc));
            cnt3 = cnt3 + 1;
          } else {
            temp_4[cnt3 - 1] = temp_4[cnt3 - 1] + Number(i.temperature);
            humid_4[cnt3 - 1] = humid_4[cnt3 - 1] + i.humidity;
            pm10_4[cnt3 - 1] = pm10_4[cnt3 - 1] + i.pm10;
            pm2_5_4[cnt3 - 1] = pm2_5_4[cnt3 - 1] + i.pm2_5;
            tvoc_4[cnt3 - 1] = tvoc_4[cnt3 - 1] + i.tvoc;
            //console.log(i);
          }
        }

        prei = i;
      }

      //console.log('temp',temp_2);

      var excel = {};
      for (let j = 0; j < cnt; j++) {
        temp_1[j] = Math.round(temp_1[j] / 24);
        humid_1[j] = Math.round(humid_1[j] / 24);
        pm10_1[j] = Math.round(pm10_1[j] / 24);
        pm2_5_1[j] = Math.round(pm2_5_1[j] / 24);
        tvoc_1[j] = Math.round(tvoc_1[j] / 24);

        excel.zone = zones[0];
        excel.temp = temp_1[j];
        excel.humid = humid_1[j];
        excel.pm10 = pm10_1[j];
        excel.pm2_5 = pm2_5_1[j];
        excel.tvoc = tvoc_1[j];
        excel.date = period[j];
        excels.push(excel);
      }

      for (let j = 0; j < cnt1; j++) {
        //var excel = {};

        temp_2[j] = Math.round(temp_2[j] / 24);
        humid_2[j] = Math.round(humid_2[j] / 24);
        pm10_2[j] = Math.round(pm10_2[j] / 24);
        pm2_5_2[j] = Math.round(pm2_5_2[j] / 24);
        tvoc_2[j] = Math.round(tvoc_2[j] / 24);
        //console.log(temp_2);

        excel.zone = zones[1];
        excel.temp = temp_2[j];
        excel.humid = humid_2[j];
        excel.pm10 = pm10_2[j];
        excel.pm2_5 = pm2_5_2[j];
        excel.tvoc = tvoc_2[j];
        excel.date = period[j];
        excels.push(excel);
      }

      for (let j = 0; j < cnt2; j++) {
        temp_3[j] = Math.round(temp_3[j] / 24);
        humid_3[j] = Math.round(humid_3[j] / 24);
        pm10_3[j] = Math.round(pm10_3[j] / 24);
        pm2_5_3[j] = Math.round(pm2_5_3[j] / 24);
        tvoc_3[j] = Math.round(tvoc_3[j] / 24);

        excel.zone = zones[2];
        excel.temp = temp_3[j];
        excel.humid = humid_3[j];
        excel.pm10 = pm10_3[j];
        excel.pm2_5 = pm2_5_3[j];
        excel.tvoc = tvoc_3[j];
        excel.date = period[j];
        excels.push(excel);
      }

      for (let j = 0; j < cnt3; j++) {
        temp_4[j] = Math.round(temp_4[j] / 24);
        humid_4[j] = Math.round(humid_4[j] / 24);
        pm10_4[j] = Math.round(pm10_4[j] / 24);
        pm2_5_4[j] = Math.round(pm2_5_4[j] / 24);
        tvoc_4[j] = Math.round(tvoc_4[j] / 24);

        excel.zone = zones[3];
        excel.temp = temp_4[j];
        excel.humid = humid_4[j];
        excel.pm10 = pm10_4[j];
        excel.pm2_5 = pm2_5_4[j];
        excel.tvoc = tvoc_4[j];
        excel.date = period[j];
        excels.push(excel);
      }
      //console.log(period, temp);

      setTempGraph(temp_1);
      sethumiGraph(humid_1);
      setDustGraph(pm10_1);
      setUltraDustGraph(pm2_5_1);
      setTvocGraph(tvoc_1);

      setTempGraph2(temp_2);
      sethumiGraph2(humid_2);
      setDustGraph2(pm10_2);
      setUltraDustGraph2(pm2_5_2);
      setTvocGraph2(tvoc_2);

      setTempGraph3(temp_3);
      sethumiGraph3(humid_3);
      setDustGraph3(pm10_3);
      setUltraDustGraph3(pm2_5_3);
      setTvocGraph3(tvoc_3);

      setTempGraph4(temp_4);
      sethumiGraph4(humid_4);
      setDustGraph4(pm10_4);
      setUltraDustGraph4(pm2_5_4);
      setTvocGraph4(tvoc_4);

      // console.log(tempGraph, tempGraph2, tempGraph3, tempGraph4);

      setDateStr(period);
      setExcelData(excels);

      const sum = (arr, cnts) => {
        if (arr.length > 1) {
          //console.log(arr);
          //console.log(cnts);
          return Math.round(arr.reduce((a, b) => a + b) / cnts);
        } else {
          return 0;
        }
      };
      // console.log('temp2',temp_2);

      setZoneInfo1([sum(temp_1, cnt), sum(humid_1, cnt), sum(pm10_1, cnt), sum(pm2_5_1, cnt), sum(tvoc_1, cnt)]);
      setZoneInfo2([sum(temp_2, cnt1), sum(humid_2, cnt1), sum(pm10_2, cnt1), sum(pm2_5_2, cnt1), sum(tvoc_2, cnt1)]);
      setZoneInfo3([sum(temp_3, cnt2), sum(humid_3, cnt2), sum(pm10_3, cnt2), sum(pm2_5_3, cnt2), sum(tvoc_3, cnt2)]);
      setZoneInfo4([sum(temp_4, cnt3), sum(humid_4, cnt3), sum(pm10_4, cnt3), sum(pm2_5_4, cnt3), sum(tvoc_4, cnt3)]);
      //console.log(zoneInfo1,zoneInfo2);

      // console.log("envdone");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  useEffect(() => {
    getAPIenv();
    // 30분마다 새로 고침 하여 데이터를 신규로 받아옴.
    // 30분 = 1800초 * 100 하여 밀리세컨단위로 변환 1800000
    setInterval(getAPIenv, 1800000);
  }, []);

  //기간선택후 검색 클릭시
  const searchHandler = () => {
    getAPIenv();
  };

  return (
    <Background>
      <div className={me && me.theme === "dark" ? "darkback" : "lightback"}>
        <Header page={"0"} />
        <Nav value={"3"} bottomValue={"5"} />
        <div className="Sel_date">
          분석기간 선택&nbsp;
          <input type="date" id="currentDate" value={sttdate} onChange={(e) => setSttdate(e.target.value)} />
          &nbsp;&nbsp;~&nbsp;&nbsp;
          <input type="date" id="currentDate2" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
          <button type="button " className="button" onClick={searchHandler}>
            검 색
          </button>
          <button type="button" className="button" style={{ "padding-top": "5px" }}>
            <CSVLink
              className="csv"
              data={excelData}
              filename={"환경정보데이터-" + sttdate + "-" + enddate}
              onClick={(event) => {
                // console.log("You click the link");
                // return false; // ???? You are stopping the handling of component
              }}
            >
              다운로드
            </CSVLink>
          </button>
        </div>
        <div className="envinfo">
          <EnvInfo zoneIndex={"1"} zoneName={"황리단길"} zoneInfo={zoneInfo1} theme={"light"} />
          <EnvInfo zoneIndex={"2"} zoneName={"불국사"} zoneInfo={zoneInfo2} theme={"light"} />
          <EnvInfo zoneIndex={"3"} zoneName={"동궁과월지"} zoneInfo={zoneInfo3} theme={"light"} />
          <EnvInfo zoneIndex={"4"} zoneName={"봉황대고분"} zoneInfo={zoneInfo4} theme={"light"} />
          {/*<EnvInfo zoneIndex={'5'} zoneName={'송학동 고분군'} zoneInfo={zoneInfo5} theme={me && me.theme === 'dark'? 'dark':'light'}/>
           */}
        </div>

        {/*<!--그래프--> */}
        <div className="fpa_graph_box_env">
          {/*
                <!--온도 & 습도--> */}
          <div className="fpa_graph_view_w100 pos_left">
            <div className="fpa_graph_box_title">
              <span className="title">온도 &amp; 습도</span>
            </div>
            <div className="fpa_graph">
              <div id="visit1" className="visit">
                {tempGraph.length > 0 ? (
                  <EnvChart
                    labels={dateStr}
                    label1={"온도"}
                    label2={"습도"}
                    data11={tempGraph}
                    data12={tempGraph2}
                    data13={tempGraph3}
                    data14={tempGraph4}
                    data21={humiGraph}
                    data22={humiGraph2}
                    data23={humiGraph3}
                    data24={humiGraph4}
                    theme={"light"}
                  />
                ) : (
                  <div style={{ height: "285px" }}></div>
                )}
              </div>
            </div>
          </div>
          <div className="graph2">
            {/*
                <!--미세먼지 & 초미세먼지--> */}
            <div className="fpa_graph_view_h50 pos_left">
              <div className="fpa_graph_box_title">
                <span className="title">미세먼지 &amp; 초미세먼지</span>
              </div>
              <div className="fpa_graph">
                <div id="visit2" className="visit">
                  {dustGraph.length > 0 ? (
                    <EnvDustChart
                      tChart
                      labels={dateStr}
                      label1={"미세먼지"}
                      label2={"초미세먼지"}
                      data11={dustGraph}
                      data12={dustGraph2}
                      data13={dustGraph3}
                      data14={dustGraph4}
                      data21={ultraDustGraph}
                      data22={ultraDustGraph2}
                      data23={ultraDustGraph3}
                      data24={ultraDustGraph4}
                      theme={"light"}
                    />
                  ) : (
                    <div style={{ height: "285px" }}></div>
                  )}
                </div>
              </div>
            </div>
            {/*
                <!--TVOC--> */}
            <div className="fpa_graph_view_h50 pos_right2 ">
              <div className="fpa_graph_box_title">
                <span className="title">TVOC (휘발성유기화합물)</span>
              </div>
              <div className="fpa_graph">
                <div id="visit" className="visit">
                  {tvocGraph.length > 0 ? (
                    <EnvTvocChart labels={dateStr} data1={tvocGraph} data2={tvocGraph2} data3={tvocGraph3} data4={tvocGraph4} theme={"light"} />
                  ) : (
                    <div style={{ height: "285px" }}></div>
                  )}
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

export default Environmental;
