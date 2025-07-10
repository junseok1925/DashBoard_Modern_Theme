import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { CSVLink, CSVDownload } from "react-csv";
import Head from "next/head";

import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import NavBottom from "../../components/common/NavBottom";
import DoughnutChart from "../../components/charts/transportDoughnutChart";
import BarChart from "../../components/charts/transportbarChart";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Background = styled.div`
  background-color: #f6f9fe;
  .researchBox {
    display: grid;
    grid-template-columns: 2fr 7fr 0.1fr 3fr 0.7fr;
    margin: 5px 10px 5px 10px;
  }

  .Sel_date {
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 5px #cccccc;
    //margin: 5px 30px 5px auto;
    padding: 5px 0 5px 0;
    border-radius: 5px;
    text-align: center;
    color: black;
  }
  .stackinfo {
    box-shadow: 0px 0px 5px #cccccc;
    margin: 0;
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
    width: 90vw;
    height: 80vh;
    float: left;
    margin: 0 0 0 0;
    margin-left: 5vw;
    padding: 5px 10px 0 0;
  }
  .division {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    //margin: 0 5% 0 5%;
  }
  .zonebox {
    background-color : white;
    margin: 2% 2% 2% 2%;
    //padding: 0% 5% 2% 5%;
    height: 34vh;
    border-radius: 15px;
z    text-align: center;
    align-items: center;
  }
  .zonebox2 {
    padding: 0% 0% 2% 25%;
    border-radius: 15px;
    align-items: center;
    height: 30vh;
  }
  .zonebox3 {
    padding: 10% 0% 0% 2%;
    align-items: center;
    height: 100vh;
    width: 27vw;
  }
  
  .zoneName {
    font-size: 15pt;
    font-
    text-align: center;
    border-bottom: 1px solid gray;
  }

  .page{
    width: 100vw;
    height: 75vh;
  }

`;

const Floatpopulation = () => {
  const dispatch = useDispatch();
  const { me, ago7day, today } = useSelector((state) => state.auth);
  const [sttdate, setSttdate] = useState(ago7day);
  const [enddate, setEnddate] = useState(today);
  const [subCategoryId, setSubCategoryId] = useState(0); //라디오버튼 값
  const [daylabel, setDayLabel] = useState([]);
  const [loding, setLoding] = useState(false);
  const { logs } = useSelector((state) => state.ardata);
  const todayDate = new Date();
  const curYear = todayDate.getFullYear();
  const [selectYear, setSelectYear] = useState(curYear);
  const [selectMonth, setSelectMonth] = useState(1);
  let selectList = [];
  let selectMonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //zones1
  const [zoneInfo1, setZoneInfo1] = useState([0, 0]); // [0]: 경주역 [1]: 버스터미널 //황리단길 권역
  const [zoneInfo2, setZoneInfo2] = useState([0, 0]); // 불국사존
  const [zoneInfo3, setZoneInfo3] = useState([0, 0]); // 석굴암존
  const [zoneInfo4, setZoneInfo4] = useState([0, 0]); // 봉황대고분
  const [zoneInfo5, setZoneInfo5] = useState([0, 0]); // 동궁과월지
  const [zoneInfo6, setZoneInfo6] = useState([0, 0]); // 첨성대
  const [zoneInfo7, setZoneInfo7] = useState([0, 0]); // 보문단지
  const [zoneInfo8, setZoneInfo8] = useState([0, 0]); // 동부해안가

  const [settings, setSettings] = useState({});
  const slideEl = useRef(null);

  const zones = ["2078", "2082", "2083", "2084", "2085", "2086", "2150", "2151"];

  const getAPIdata = async () => {
    const zoneTransportData = [
      { zoneid: "2087", name: "경주터미널" },
      { zoneid: "2149", name: "경주역" },
    ];

    // console.log('test',zoneData.zoneid)

    /**
     * 유동인구 수
     */

    try {
      const arrY1_1 = [0, 0];
      const arrY1_2 = [0, 0];
      const arrY1_3 = [0, 0];
      const arrY1_4 = [0, 0];
      const arrY1_5 = [0, 0];
      const arrY1_6 = [0, 0];
      const arrY1_7 = [0, 0];
      const arrY1_8 = [0, 0];

      const arrY2_1 = [[], []];
      const arrY2_2 = [[], []];
      const arrY2_3 = [[], []];
      const arrY2_4 = [[], []];
      const arrY2_5 = [[], []];
      const arrY2_6 = [[], []];
      const arrY2_7 = [[], []];
      const arrY2_8 = [[], []];
      const labelList = [];

      // console.log(
      //   "zone간 유동인구 API",
      //   `${process.env.NEXT_PUBLIC_API_pohang_URL}/DayMove?from=${sttdate}&to=${enddate}`
      // );

      if (subCategoryId == 1) {
        const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DayMove?from=${sttdate}&to=${enddate}`);
        // console.log(
        //   "zone간 유동인구 API",
        //   `${process.env.NEXT_PUBLIC_API_pohang_URL}/DayMove?from=${sttdate}&to=${enddate}`
        // );
        for (let i of responseVisit.data) {
          //for (let j of zoneTransportData){
          if (i.zone_move.slice(0, 4) == "2087") {
            if (i.zone_move.slice(5, 9) === zones[0]) {
              arrY1_1[0] = arrY1_1[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[1]) {
              arrY1_2[0] = arrY1_2[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[2]) {
              arrY1_3[0] = arrY1_3[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[3]) {
              arrY1_4[0] = arrY1_4[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[4]) {
              arrY1_5[0] = arrY1_5[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[5]) {
              arrY1_6[0] = arrY1_6[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[6]) {
              arrY1_7[0] = arrY1_7[0] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[7]) {
              arrY1_8[0] = arrY1_8[0] + i.data;
            }
          } else if (i.zone_move.slice(5, 9) == "2087") {
            if (i.zone_move.slice(0, 4) == zones[0]) {
              arrY1_1[0] = arrY1_1[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[1]) {
              arrY1_2[0] = arrY1_2[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[2]) {
              arrY1_3[0] = arrY1_3[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[3]) {
              arrY1_4[0] = arrY1_4[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[4]) {
              arrY1_5[0] = arrY1_5[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[5]) {
              arrY1_6[0] = arrY1_6[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[6]) {
              arrY1_7[0] = arrY1_7[0] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[7]) {
              arrY1_8[0] = arrY1_8[0] + i.data;
            }
          } else if (i.zone_move.slice(0, 4) === "2149") {
            if (i.zone_move.slice(5, 9) === zones[0]) {
              arrY1_1[1] = arrY1_1[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[1]) {
              arrY1_2[1] = arrY1_2[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[2]) {
              arrY1_3[1] = arrY1_3[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[3]) {
              arrY1_4[1] = arrY1_4[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[4]) {
              arrY1_5[1] = arrY1_5[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[5]) {
              arrY1_6[1] = arrY1_6[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[6]) {
              arrY1_7[1] = arrY1_7[1] + i.data;
            } else if (i.zone_move.slice(5, 9) === zones[7]) {
              arrY1_8[1] = arrY1_8[1] + i.data;
            }
          } else if (i.zone_move.slice(5, 9) === "2149") {
            if (i.zone_move.slice(0, 4) === zones[0]) {
              arrY1_1[1] = arrY1_1[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[1]) {
              arrY1_2[1] = arrY1_2[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[2]) {
              arrY1_3[1] = arrY1_3[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[3]) {
              arrY1_4[1] = arrY1_4[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[4]) {
              arrY1_5[1] = arrY1_5[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[5]) {
              arrY1_6[1] = arrY1_6[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[6]) {
              arrY1_7[1] = arrY1_7[1] + i.data;
            } else if (i.zone_move.slice(0, 4) === zones[7]) {
              arrY1_8[1] = arrY1_8[1] + i.data;
            }
          }
          //}
        }
        setZoneInfo1(arrY1_1);
        setZoneInfo2(arrY1_2);
        setZoneInfo3(arrY1_3);
        setZoneInfo4(arrY1_4);
        setZoneInfo5(arrY1_5);
        setZoneInfo6(arrY1_6);
        setZoneInfo7(arrY1_7);
        setZoneInfo8(arrY1_8);
        //console.log(arrY1_1);
      } else if (subCategoryId == 2) {
        const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/WeekMove?from=${sttdate}&to=${enddate}`);
        // console.log(
        //   `${process.env.NEXT_PUBLIC_API_pohang_URL}/WeekMove?from=${sttdate}&to=${enddate}`
        // );
        for (let i of responseVisit.data) {
          //console.log(i.zone_move)
          for (let j of zoneTransportData) {
            if (i.zone_move.slice(0, 4) == "2087") {
              if (i.zone_move.slice(5, 9) === zones[0]) {
                arrY2_1[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[1]) {
                arrY2_2[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[2]) {
                arrY2_3[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[3]) {
                arrY2_4[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[4]) {
                arrY2_5[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[5]) {
                arrY2_6[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[6]) {
                arrY2_7[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[7]) {
                arrY2_8[0].push([i.data, i.time.slice(0, 10)]);
              }
            } else if (i.zone_move.slice(5, 9) == "2087") {
              if (i.zone_move.slice(0, 4) == zones[0]) {
                arrY2_1[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[1]) {
                arrY2_2[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[2]) {
                arrY2_3[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[3]) {
                arrY2_4[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[4]) {
                arrY2_5[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[5]) {
                arrY2_6[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[6]) {
                arrY2_7[0].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) == zones[7]) {
                arrY2_8[0].push([i.data, i.time.slice(0, 10)]);
              }
            } else if (i.zone_move.slice(0, 4) === "2149") {
              if (i.zone_move.slice(5, 9) === zones[0]) {
                arrY2_1[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[1]) {
                arrY2_2[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[2]) {
                arrY2_3[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[3]) {
                arrY2_4[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[4]) {
                arrY2_5[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[5]) {
                arrY2_6[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[6]) {
                arrY2_7[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(5, 9) === zones[7]) {
                arrY2_8[1].push([i.data, i.time.slice(0, 10)]);
              }
            } else if (i.zone_move.slice(5, 9) === "2149") {
              if (i.zone_move.slice(0, 4) === zones[0]) {
                arrY2_1[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[1]) {
                arrY2_2[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[2]) {
                arrY2_3[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[3]) {
                arrY2_4[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[4]) {
                arrY2_5[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[5]) {
                arrY2_6[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[6]) {
                arrY2_7[1].push([i.data, i.time.slice(0, 10)]);
              } else if (i.zone_move.slice(0, 4) === zones[7]) {
                arrY2_8[1].push([i.data, i.time.slice(0, 10)]);
              }
            }
          }
        }
        //날짜순으로 데이터 변경하기
        arrY2_1.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_2.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_3.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_4.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_5.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_6.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_7.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_8.sort((a, b) => new Date(a[1]) - new Date(b[1]));

        //중복제거
        const dedupulation = (arrY) => {
          for (let i = 0; i < arrY[0].length; i++) {
            if (arrY[0][i][1] == arrY[0][i + 1][1]) {
              arrY[0].splice(i, 1);
            }
            if (i + 2 >= arrY[0].length) {
              break;
            }
          }
          for (let i = 0; i < arrY[1].length; i++) {
            if (arrY[1][i][1] == arrY[1][i + 1][1]) {
              arrY[1].splice(i, 1);
            }
            if (i + 2 >= arrY[1].length) {
              break;
            }
          }
        };

        dedupulation(arrY2_1); //중복제거
        dedupulation(arrY2_2);
        dedupulation(arrY2_3);
        dedupulation(arrY2_4);
        dedupulation(arrY2_5);
        dedupulation(arrY2_6);
        dedupulation(arrY2_7);
        dedupulation(arrY2_8);

        const arrY21 = [
          [[], []],
          [[], []],
        ]; //[버스,날짜], [ktx,날짜]
        const arrY22 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY23 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY24 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY25 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY26 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY27 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY28 = [
          [[], []],
          [[], []],
        ]; //버스 ktx

        //월별 몇주차인지 계산
        function getWeekOfMonth(date) {
          var dates = new Date(date);
          const firstDayOfMonth = new Date(dates.getFullYear(), dates.getMonth(), 1); // 해당 월의 첫 번째 날
          const firstDayWeekday = firstDayOfMonth.getDay(); // 첫 번째 날의 요일 (일: 0, 월: 1, ... 토: 6)
          const adjustedDate = dates.getDate() + firstDayWeekday; // 해당 날짜의 일자 + 첫 번째 날의 요일

          // 주차 계산 (Math.ceil을 사용해 반올림)
          return Math.ceil(adjustedDate / 7);
        }

        // 사용 예제
        //const inputDate = new Date('2024-08-15'); // 입력 날짜
        //const weekOfMonth = getWeekOfMonth(inputDate);
        //console.log(`해당 날짜는 ${weekOfMonth}주차입니다.`);

        //데이터 정리
        const dataSetting = (arrY, arrYs) => {
          for (let i = 0; i < arrY[0].length; i++) {
            arrYs[0][0].push(arrY[0][i][0]);
            arrYs[0][1].push(arrY[0][i][1].slice(2, 8) + getWeekOfMonth(arrY[0][i][1]) + "주");
          }
          for (let i = 0; i < arrY[1].length; i++) {
            arrYs[1][0].push(arrY[1][i][0]);
            arrYs[1][1].push(arrY[0][i][1].slice(2, 8) + getWeekOfMonth(arrY[1][i][1]) + "주");
          }
        };

        dataSetting(arrY2_1, arrY21);
        dataSetting(arrY2_2, arrY22);
        dataSetting(arrY2_3, arrY23);
        dataSetting(arrY2_4, arrY24);
        dataSetting(arrY2_5, arrY25);
        dataSetting(arrY2_6, arrY26);
        dataSetting(arrY2_7, arrY27);
        dataSetting(arrY2_8, arrY28);

        setZoneInfo1(arrY21);
        setZoneInfo2(arrY22);
        setZoneInfo3(arrY23);
        setZoneInfo4(arrY24);
        setZoneInfo5(arrY25);
        setZoneInfo6(arrY26);
        setZoneInfo7(arrY27);
        setZoneInfo8(arrY28);
      } else if (subCategoryId == 3) {
        const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/MonthMove?from=${sttdate}&to=${enddate}`);
        for (let i of responseVisit.data) {
          //console.log(i.zone_move)
          for (let j of zoneTransportData) {
            if (i.zone_move.slice(0, 4) == "2087") {
              if (i.zone_move.slice(5, 9) === zones[0]) {
                arrY2_1[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[1]) {
                arrY2_2[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[2]) {
                arrY2_3[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[3]) {
                arrY2_4[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[4]) {
                arrY2_5[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[5]) {
                arrY2_6[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[6]) {
                arrY2_7[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[7]) {
                arrY2_8[0].push([i.data, i.time.slice(2, 7)]);
              }
            } else if (i.zone_move.slice(5, 9) == "2087") {
              if (i.zone_move.slice(0, 4) == zones[0]) {
                arrY2_1[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[1]) {
                arrY2_2[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[2]) {
                arrY2_3[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[3]) {
                arrY2_4[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[4]) {
                arrY2_5[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[5]) {
                arrY2_6[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[6]) {
                arrY2_7[0].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) == zones[7]) {
                arrY2_8[0].push([i.data, i.time.slice(2, 7)]);
              }
            } else if (i.zone_move.slice(0, 4) === "2149") {
              if (i.zone_move.slice(5, 9) === zones[0]) {
                arrY2_1[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[1]) {
                arrY2_2[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[2]) {
                arrY2_3[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[3]) {
                arrY2_4[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[4]) {
                arrY2_5[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[5]) {
                arrY2_6[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[6]) {
                arrY2_7[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(5, 9) === zones[7]) {
                arrY2_8[1].push([i.data, i.time.slice(2, 7)]);
              }
            } else if (i.zone_move.slice(5, 9) === "2149") {
              if (i.zone_move.slice(0, 4) === zones[0]) {
                arrY2_1[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[1]) {
                arrY2_2[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[2]) {
                arrY2_3[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[3]) {
                arrY2_4[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[4]) {
                arrY2_5[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[5]) {
                arrY2_6[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[6]) {
                arrY2_7[1].push([i.data, i.time.slice(2, 7)]);
              } else if (i.zone_move.slice(0, 4) === zones[7]) {
                arrY2_8[1].push([i.data, i.time.slice(2, 7)]);
              }
            }
          }
        }
        //날짜순으로 데이터 변경하기
        arrY2_1.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_2.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_3.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_4.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_5.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_6.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_7.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        arrY2_8.sort((a, b) => new Date(a[1]) - new Date(b[1]));

        //중복제거
        const dedupulation = (arrY) => {
          for (let i = 0; i < arrY[0].length; i++) {
            if (arrY[0][i][1] == arrY[0][i + 1][1]) {
              arrY[0].splice(i, 1);
            }
            if (i + 2 >= arrY[0].length) {
              break;
            }
          }
          for (let i = 0; i < arrY[1].length; i++) {
            if (arrY[1][i][1] == arrY[1][i + 1][1]) {
              arrY[1].splice(i, 1);
            }
            if (i + 2 >= arrY[1].length) {
              break;
            }
          }
        };
        //console.log('중복제거전',arrY2_2)

        dedupulation(arrY2_1); //중복제거
        dedupulation(arrY2_2);
        dedupulation(arrY2_3);
        dedupulation(arrY2_4);
        dedupulation(arrY2_5);
        dedupulation(arrY2_6);
        dedupulation(arrY2_7);
        dedupulation(arrY2_8);

        const arrY21 = [
          [[], []],
          [[], []],
        ]; //[버스,날짜], [ktx,날짜]
        const arrY22 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY23 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY24 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY25 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY26 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY27 = [
          [[], []],
          [[], []],
        ]; //버스 ktx
        const arrY28 = [
          [[], []],
          [[], []],
        ]; //버스 ktx

        //데이터 정리
        const dataSetting = (arrY, arrYs) => {
          for (let i = 0; i < arrY[0].length; i++) {
            arrYs[0][0].push(arrY[0][i][0]);
            arrYs[0][1].push(arrY[0][i][1]);
          }
          for (let i = 0; i < arrY[1].length; i++) {
            arrYs[1][0].push(arrY[1][i][0]);
            arrYs[1][1].push(arrY[1][i][1]);
          }
        };

        dataSetting(arrY2_1, arrY21);
        dataSetting(arrY2_2, arrY22);
        dataSetting(arrY2_3, arrY23);
        dataSetting(arrY2_4, arrY24);
        dataSetting(arrY2_5, arrY25);
        dataSetting(arrY2_6, arrY26);
        dataSetting(arrY2_7, arrY27);
        dataSetting(arrY2_8, arrY28);

        setZoneInfo1(arrY21);
        setZoneInfo2(arrY22);
        setZoneInfo3(arrY23);
        setZoneInfo4(arrY24);
        setZoneInfo5(arrY25);
        setZoneInfo6(arrY26);
        setZoneInfo7(arrY27);
        setZoneInfo8(arrY28);
      }

      //console.log(arrY1_1)
      //setAllInfo([zoneData[0].alldata, zoneData[1].alldata, zoneData[2].alldata, zoneData[3].alldata, zoneData[4].alldata, zoneData[5].alldata, zoneData[6].alldata]);
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
    setSettings({
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      waitForAnimate: false,
      autoplaySpeed: 4000, // 4000
    });
    getAPIdata();
    setInterval(getAPIdata, 1800000);
  }, []);

  //기간선택후 검색 클릭시
  const searchHandler = () => {
    getAPIdata();
  };

  const categoryHandler = (e) => {
    setSubCategoryId(Number(e.target.value));
    getAPIdata();
  };

  return (
    <Background>
      <div className="lightback">
        <Header page={"0"} />
        <Nav value={"3"} bottomValue={"8"} />
        <div className="researchBox">
          <div></div>

          <div className="Sel_date">
            <b>검색설정 : </b>
            <label>
              <input type="radio" value={1} onChange={categoryHandler} checked={subCategoryId == 1} />
              &nbsp;기간별 &nbsp;
            </label>
            <label>
              <input type="radio" value={2} onChange={categoryHandler} checked={subCategoryId == 2} />
              &nbsp;주간별 &nbsp;
            </label>
            <label>
              <input type="radio" value={3} onChange={categoryHandler} checked={subCategoryId == 3} />
              &nbsp;월별 &nbsp; &nbsp;&nbsp;
            </label>
            <b> 유동인구</b> 분석기간 &nbsp;
            <input type="date" id="currentDate" value={sttdate} onChange={(e) => setSttdate(e.target.value)} />
            &nbsp;&nbsp;~&nbsp;&nbsp;
            <input type="date" id="currentDate2" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
            &nbsp;
            <button type="button " className="button" onClick={searchHandler}>
              {" "}
              검 색{" "}
            </button>
          </div>
          <div></div>
          <div></div>
        </div>

        {subCategoryId == 1 ? (
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div className="page">
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">황리단길</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo1} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">불국사</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo2} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">석굴암</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo3} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                </div>
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">봉황대고분</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo4} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">동궁과월지</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo5} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">첨성대</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo6} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">보문단지</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo7} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">동부해안가</div>
                    <div className="zonebox2">
                      <DoughnutChart datas={zoneInfo8} label={["버스", "KTX"]}></DoughnutChart>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        ) : (
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div className="page">
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">황리단길</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo1[0][1]} datas={[zoneInfo1[0][0], zoneInfo1[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">불국사</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo2[0][1]} datas={[zoneInfo2[0][0], zoneInfo2[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">석굴암</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo3[0][1]} datas={[zoneInfo3[0][0], zoneInfo3[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                </div>
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">봉황대고분</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo4[0][1]} datas={[zoneInfo4[0][0], zoneInfo4[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">동궁과월지</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo5[0][1]} datas={[zoneInfo5[0][0], zoneInfo5[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">첨성대</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo6[0][1]} datas={[zoneInfo6[0][0], zoneInfo6[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="division">
                  <div className="zonebox">
                    <div className="zoneName">보문단지</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo7[0][1]} datas={[zoneInfo7[0][0], zoneInfo7[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                  <div className="zonebox">
                    <div className="zoneName">동부해안가</div>
                    <div className="zonebox3">
                      <BarChart daylabel={zoneInfo8[0][1]} datas={[zoneInfo8[0][0], zoneInfo8[1][0]]} label={["버스", "KTX"]}></BarChart>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        )}
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

export default Floatpopulation;
