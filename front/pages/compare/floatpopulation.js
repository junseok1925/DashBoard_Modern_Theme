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
import StackStatistics from "../../components/info/StackStatistics";
import FloatPopulationInfo from "../../components/info/FloatPopulationInfo";
import NavBottom from "../../components/common/NavBottom";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import { LOAD_ARDATA_REQUEST } from "../../reducers/ardata";
import wrapper from "../../store/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Background = styled.div`
  font-family: "Pretendard", sans-serif;

  background-color: black;

  input[type="date"],
  select {
    background-color: #2c2c2c; /* 어두운 배경 */
    color: white; /* 입력값 색상 */
    border: 1px solid #555;
    padding: 5px;
    border-radius: 5px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1); /* 달력 아이콘 색상 변경 */
  }

  .researchBox {
    display: grid;
    grid-template-columns: 2fr 7fr 0.1fr 3fr 0.7fr;
    margin: 5px 10px 5px 10px;
  }

  .Sel_date {
    width: 100%;
    background-color: #2d2d42;
    margin: 0px 3px 0px 3px;
    padding: 5px 0 5px 0;
    border-radius: 5px;
    text-align: center;
    color: white;
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
    background: #4165e5;

    &:hover {
      background: #399aff;
    }
  }
  .compare_list {
    width: 100%;
    height: 100%;
    float: left;
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

  .slick-dots {
    margin-top: 100px;
    background-color: black;
    padding: 10px 0;
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
  .slick-dots li button:before {
    color: white;
  }

  .slick-dots li.slick-active button:before {
    color: white;
    opacity: 1;
  }
`;

const Floatpopulation = () => {
  const dispatch = useDispatch();

  const { me, ago7day, today } = useSelector((state) => state.auth);
  const [sttdate, setSttdate] = useState(ago7day);
  const [enddate, setEnddate] = useState(today);
  const [loding, setLoding] = useState(false);
  const { logs } = useSelector((state) => state.ardata);
  const todayDate = new Date();
  const curYear = todayDate.getFullYear();
  const [selectYear, setSelectYear] = useState(curYear);
  const [selectMonth, setSelectMonth] = useState(1);
  let selectList = [];
  let selectMonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //zones1
  const [zoneInfo1_1, setZoneInfo1_1] = useState([0, 0, 0, 0, 0]); // [0]: 방문자수 [1]: 재방문자수 [2]: 체류시간 [3]: 체류인원
  const [zoneInfo1_2, setZoneInfo1_2] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_3, setZoneInfo1_3] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_4, setZoneInfo1_4] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_5, setZoneInfo1_5] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_6, setZoneInfo1_6] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_7, setZoneInfo1_7] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo1_8, setZoneInfo1_8] = useState([0, 0, 0, 0, 0]);
  //zones2
  const [zoneInfo2_1, setZoneInfo2_1] = useState([0, 0, 0, 0, 0]); // [0]: 방문자수 [1]: 재방문자수 [2]: 체류시간 [3]: 체류인원
  const [zoneInfo2_2, setZoneInfo2_2] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo2_3, setZoneInfo2_3] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo2_4, setZoneInfo2_4] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo2_5, setZoneInfo2_5] = useState([0, 0, 0, 0, 0]);
  const [zoneInfo2_6, setZoneInfo2_6] = useState([0, 0, 0, 0, 0]);

  const [allInfo, setAllInfo] = useState([0, 0, 0, 0, 0]);
  const [excelData, setExcelData] = useState([]);
  const [statisticseExcelData, setStatisticsExcelData] = useState([]);
  const [settings, setSettings] = useState({});
  const slideEl = useRef(null);

  const zones1 = ["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크", "송도해수욕장", "송도송림테마거리(솔밭도시숲)", "이가리 닻 전망대", "사방기념공원", "내연산/보경사"];
  const zones2 = ["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리", "오어사", "일월문화공원", "장기유배문화체험촌"];
  const zonesAll = "포항관광지 전체";

  const arrY1_1 = [0, 0, 0, 0]; //"영일대해수욕장/해상누각",
  const arrY1_2 = [0, 0, 0, 0]; //"환호공원",
  const arrY1_3 = [0, 0, 0, 0]; //"해상스카이워크",
  const arrY1_4 = [0, 0, 0, 0]; //"송도해수욕장",
  const arrY1_5 = [0, 0, 0, 0]; //"송도송림테마거리",
  const arrY1_6 = [0, 0, 0, 0]; //"전망대",
  const arrY1_7 = [0, 0, 0, 0]; //"사방기념공원",
  const arrY1_8 = [0, 0, 0, 0]; //"보경사",

  const arrY2_1 = [0, 0, 0, 0]; // 연오랑세오녀
  const arrY2_2 = [0, 0, 0, 0]; // 해맞이광장
  const arrY2_3 = [0, 0, 0, 0]; // 일본인가옥거리
  const arrY2_4 = [0, 0, 0, 0]; // 오어사 권역
  const arrY2_5 = [0, 0, 0, 0]; // 일월문화공원 터미널
  const arrY2_6 = [0, 0, 0, 0]; // 장기유배문화체험촌

  const arrYAll = [0, 0, 0, 0]; //전체

  const excels = [];
  const floatpepleExecels = JSON.parse(JSON.stringify(logs));

  const getAPIdata = async () => {
    /**
     * 방문객 수
     */

    try {
      const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}T09:00:00`);

      //zones1
      let arr1_1 = ["영일대해수욕장/해상누각", 0];
      let arr1_2 = ["스페이스워크(환호공원)", 0];
      let arr1_3 = ["해상스카이워크", 0];
      let arr1_4 = ["송도해수욕장", 0];
      let arr1_5 = ["송도송림테마거리(솔밭도시숲)", 0];
      let arr1_6 = ["이가리 닻 전망대", 0];
      let arr1_7 = ["사방기념공원", 0];
      let arr1_8 = ["내연산/보경사", 0];
      //zones2
      let arr2_1 = ["연오랑세오녀 테마공원(귀비고)", 0];
      let arr2_2 = ["호미곶 해맞이광장", 0];
      let arr2_3 = ["구룡포 일본인가옥거리", 0];
      let arr2_4 = ["오어사", 0];
      let arr2_5 = ["일월문화공원", 0];
      let arr2_6 = ["장기유배문화체험촌", 0];

      // total
      let arrAll = ["포항관광지 전체", 0];

      for (let i of responseVisit.data) {
        // zones1
        if (i.zone === zones1[0]) {
          arr1_1[1] = arr1_1[1] + Number(i.data);
        } else if (i.zone === zones1[1]) {
          arr1_2[1] = arr1_2[1] + Number(i.data);
        } else if (i.zone === zones1[2]) {
          arr1_3[1] = arr1_3[1] + Number(i.data);
        } else if (i.zone === zones1[3]) {
          arr1_4[1] = arr1_4[1] + Number(i.data);
        } else if (i.zone === zones1[4]) {
          arr1_5[1] = arr1_5[1] + Number(i.data);
        } else if (i.zone === zones1[5]) {
          arr1_6[1] = arr1_6[1] + Number(i.data);
        } else if (i.zone === zones1[6]) {
          arr1_7[1] = arr1_7[1] + Number(i.data);
        } else if (i.zone === zones1[7]) {
          arr1_8[1] = arr1_8[1] + Number(i.data);
          // zones2
        } else if (i.zone === zones2[0]) {
          arr2_1[1] = arr2_1[1] + Number(i.data);
        } else if (i.zone === zones2[1]) {
          arr2_2[1] = arr2_2[1] + Number(i.data);
        } else if (i.zone === zones2[2]) {
          arr2_3[1] = arr2_3[1] + Number(i.data);
        } else if (i.zone === zones2[3]) {
          arr2_4[1] = arr2_4[1] + Number(i.data);
        } else if (i.zone === zones2[4]) {
          arr2_5[1] = arr2_5[1] + Number(i.data);
        } else if (i.zone === zones2[5]) {
          arr2_6[1] = arr2_6[1] + Number(i.data);
        } else if (i.zone === zonesAll) {
          arrAll[1] = arrAll[1] + Number(i.data);
        }
        i.gbname = "방문객수";
        excels.push(i);
      }

      // zones1
      arrY1_1[0] = arr1_1[1];
      arrY1_2[0] = arr1_2[1];
      arrY1_3[0] = arr1_3[1];
      arrY1_4[0] = arr1_4[1];
      arrY1_5[0] = arr1_5[1];
      arrY1_6[0] = arr1_6[1];
      arrY1_7[0] = arr1_7[1];
      arrY1_8[0] = arr1_8[1];
      // zones2
      arrY2_1[0] = arr2_1[1];
      arrY2_2[0] = arr2_2[1];
      arrY2_3[0] = arr2_3[1];
      arrY2_4[0] = arr2_4[1];
      arrY2_5[0] = arr2_5[1];
      arrY2_6[0] = arr2_6[1];

      arrYAll[0] = arrAll[1];
    } catch (err) {
      console.error(err);
    }

    /**
     * 재방문객 수
     */

    try {
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit?from=${sttdate}&to=${enddate}T09:00:00`);

      let arr1_1 = ["영일대해수욕장/해상누각", 0];
      let arr1_2 = ["스페이스워크(환호공원)", 0];
      let arr1_3 = ["해상스카이워크", 0];
      let arr1_4 = ["송도해수욕장", 0];
      let arr1_5 = ["송도송림테마거리(솔밭도시숲)", 0];
      let arr1_6 = ["이가리 닻 전망대", 0];
      let arr1_7 = ["사방기념공원", 0];
      let arr1_8 = ["내연산/보경사", 0];
      //zones2
      let arr2_1 = ["연오랑세오녀 테마공원(귀비고)", 0];
      let arr2_2 = ["호미곶 해맞이광장", 0];
      let arr2_3 = ["구룡포 일본인가옥거리", 0];
      let arr2_4 = ["오어사", 0];
      let arr2_5 = ["일월문화공원", 0];
      let arr2_6 = ["장기유배문화체험촌", 0];

      // total
      let arrAll = ["포항관광지 전체", 0];

      for (let i of responseRevisit.data) {
        // zones1
        if (i.zone === zones1[0]) {
          arr1_1[1] = arr1_1[1] + Number(i.data);
        } else if (i.zone === zones1[1]) {
          arr1_2[1] = arr1_2[1] + Number(i.data);
        } else if (i.zone === zones1[2]) {
          arr1_3[1] = arr1_3[1] + Number(i.data);
        } else if (i.zone === zones1[3]) {
          arr1_4[1] = arr1_4[1] + Number(i.data);
        } else if (i.zone === zones1[4]) {
          arr1_5[1] = arr1_5[1] + Number(i.data);
        } else if (i.zone === zones1[5]) {
          arr1_6[1] = arr1_6[1] + Number(i.data);
        } else if (i.zone === zones1[6]) {
          arr1_7[1] = arr1_7[1] + Number(i.data);
        } else if (i.zone === zones1[7]) {
          arr1_8[1] = arr1_8[1] + Number(i.data);
          //zones2
        } else if (i.zone === zones2[0]) {
          arr2_1[1] = arr2_1[1] + Number(i.data);
        } else if (i.zone === zones2[1]) {
          arr2_2[1] = arr2_2[1] + Number(i.data);
        } else if (i.zone === zones2[2]) {
          arr2_3[1] = arr2_3[1] + Number(i.data);
        } else if (i.zone === zones2[3]) {
          arr2_4[1] = arr2_4[1] + Number(i.data);
        } else if (i.zone === zones2[4]) {
          arr2_5[1] = arr2_5[1] + Number(i.data);
        } else if (i.zone === zones2[5]) {
          arr2_6[1] = arr2_6[1] + Number(i.data);
        } else if (i.zone === zonesAll) {
          arrAll[1] = Number(i.data);
        }
        i.gbname = "재방문객수";
        excels.push(i);
      }

      // zones1
      arrY1_1[1] = arr1_1[1];
      arrY1_2[1] = arr1_2[1];
      arrY1_3[1] = arr1_3[1];
      arrY1_4[1] = arr1_4[1];
      arrY1_5[1] = arr1_5[1];
      arrY1_6[1] = arr1_6[1];
      arrY1_7[1] = arr1_7[1];
      arrY1_8[1] = arr1_8[1];
      // zones2
      arrY2_1[1] = arr2_1[1];
      arrY2_2[1] = arr2_2[1];
      arrY2_3[1] = arr2_3[1];
      arrY2_4[1] = arr2_4[1];
      arrY2_5[1] = arr2_5[1];
      arrY2_6[1] = arr2_6[1];

      arrYAll[1] = arrAll[1];
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류인원
     */

    try {
      const responseStay = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}T09:00:00`);
      //const responseStay = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+sttdate+'&to='+enddate);

      let arr1_1 = ["영일대해수욕장/해상누각", 0];
      let arr1_2 = ["스페이스워크(환호공원)", 0];
      let arr1_3 = ["해상스카이워크", 0];
      let arr1_4 = ["송도해수욕장", 0];
      let arr1_5 = ["송도송림테마거리(솔밭도시숲)", 0];
      let arr1_6 = ["이가리 닻 전망대", 0];
      let arr1_7 = ["사방기념공원", 0];
      let arr1_8 = ["내연산/보경사", 0];
      //zones2
      let arr2_1 = ["연오랑세오녀 테마공원(귀비고)", 0];
      let arr2_2 = ["호미곶 해맞이광장", 0];
      let arr2_3 = ["구룡포 일본인가옥거리", 0];
      let arr2_4 = ["오어사", 0];
      let arr2_5 = ["일월문화공원", 0];
      let arr2_6 = ["장기유배문화체험촌", 0];

      // total
      let arrAll = ["포항관광지 전체", 0];

      var dateCnt = 1;

      for (let i of responseStay.data) {
        // zones1
        if (i.zone === zones1[0]) {
          arr1_1[1] = arr1_1[1] + Number(i.data);
        } else if (i.zone === zones1[1]) {
          arr1_2[1] = arr1_2[1] + Number(i.data);
        } else if (i.zone === zones1[2]) {
          arr1_3[1] = arr1_3[1] + Number(i.data);
        } else if (i.zone === zones1[3]) {
          arr1_4[1] = arr1_4[1] + Number(i.data);
        } else if (i.zone === zones1[4]) {
          arr1_5[1] = arr1_5[1] + Number(i.data);
        } else if (i.zone === zones1[5]) {
          arr1_6[1] = arr1_6[1] + Number(i.data);
        } else if (i.zone === zones1[6]) {
          arr1_7[1] = arr1_7[1] + Number(i.data);
        } else if (i.zone === zones1[7]) {
          arr1_8[1] = arr1_8[1] + Number(i.data);
          //zones2
        } else if (i.zone === zones2[0]) {
          arr2_1[1] = arr2_1[1] + Number(i.data);
        } else if (i.zone === zones2[1]) {
          arr2_2[1] = arr2_2[1] + Number(i.data);
        } else if (i.zone === zones2[2]) {
          arr2_3[1] = arr2_3[1] + Number(i.data);
        } else if (i.zone === zones2[3]) {
          arr2_4[1] = arr2_4[1] + Number(i.data);
        } else if (i.zone === zones2[4]) {
          arr2_5[1] = arr2_5[1] + Number(i.data);
        } else if (i.zone === zones2[5]) {
          arr2_6[1] = arr2_6[1] + Number(i.data);
        } else if (i.zone === zonesAll) {
          arrAll[1] = Number(i.data);
        }

        i.gbname = "체류인원";
        excels.push(i);
      }

      if (dateCnt > 1) {
        dateCnt = dateCnt - 1;
      }
      // zonse1
      arrY1_1[2] = Math.round(Number(arr1_1[1]) / 24 / dateCnt);
      arrY1_2[2] = Math.round(Number(arr1_2[1]) / 24 / dateCnt);
      arrY1_3[2] = Math.round(Number(arr1_3[1]) / 24 / dateCnt);
      arrY1_4[2] = Math.round(Number(arr1_4[1]) / 24 / dateCnt);
      arrY1_5[2] = Math.round(Number(arr1_5[1]) / 24 / dateCnt);
      arrY1_6[2] = Math.round(Number(arr1_6[1]) / 24 / dateCnt);
      arrY1_7[2] = Math.round(Number(arr1_7[1]) / 24 / dateCnt);
      arrY1_8[2] = Math.round(Number(arr1_8[1]) / 24 / dateCnt);
      //zones2
      arrY2_1[2] = Math.round(Number(arr2_1[1]) / 24 / dateCnt);
      arrY2_2[2] = Math.round(Number(arr2_2[1]) / 24 / dateCnt);
      arrY2_3[2] = Math.round(Number(arr2_3[1]) / 24 / dateCnt);
      arrY2_4[2] = Math.round(Number(arr2_4[1]) / 24 / dateCnt);
      arrY2_5[2] = Math.round(Number(arr2_5[1]) / 24 / dateCnt);
      arrY2_6[2] = Math.round(Number(arr2_6[1]) / 24 / dateCnt);

      arrYAll[2] = Math.round(Number(arrAll[1]) / 24 / dateCnt);
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류시간
     */

    try {
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime?from=${sttdate}&to=${enddate}T09:00:00`);

      let arr1_1 = ["영일대해수욕장/해상누각", 0];
      let arr1_2 = ["스페이스워크(환호공원)", 0];
      let arr1_3 = ["해상스카이워크", 0];
      let arr1_4 = ["송도해수욕장", 0];
      let arr1_5 = ["송도송림테마거리(솔밭도시숲)", 0];
      let arr1_6 = ["이가리 닻 전망대", 0];
      let arr1_7 = ["사방기념공원", 0];
      let arr1_8 = ["내연산/보경사", 0];
      //zones2
      let arr2_1 = ["연오랑세오녀 테마공원(귀비고)", 0];
      let arr2_2 = ["호미곶 해맞이광장", 0];
      let arr2_3 = ["구룡포 일본인가옥거리", 0];
      let arr2_4 = ["오어사", 0];
      let arr2_5 = ["일월문화공원", 0];
      let arr2_6 = ["장기유배문화체험촌", 0];

      // total
      let arrAll = ["포항관광지 전체", 0];

      var dateCnt = 0;

      for (let i of responseTime.data) {
        if (i.zone === zones1[0]) {
          arr1_1[1] = arr1_1[1] + Number(i.data);
          dateCnt = dateCnt + 1;
        } else if (i.zone === zones1[1]) {
          arr1_2[1] = arr1_2[1] + Number(i.data);
        } else if (i.zone === zones1[2]) {
          arr1_3[1] = arr1_3[1] + Number(i.data);
        } else if (i.zone === zones1[3]) {
          arr1_4[1] = arr1_4[1] + Number(i.data);
        } else if (i.zone === zones1[4]) {
          arr1_5[1] = arr1_5[1] + Number(i.data);
        } else if (i.zone === zones1[5]) {
          arr1_6[1] = arr1_6[1] + Number(i.data);
        } else if (i.zone === zones1[6]) {
          arr1_7[1] = arr1_7[1] + Number(i.data);
        } else if (i.zone === zones1[7]) {
          arr1_8[1] = arr1_8[1] + Number(i.data);
          //zones2
        } else if (i.zone === zones2[0]) {
          arr2_1[1] = arr2_1[1] + Number(i.data);
        } else if (i.zone === zones2[1]) {
          arr2_2[1] = arr2_2[1] + Number(i.data);
        } else if (i.zone === zones2[2]) {
          arr2_3[1] = arr2_3[1] + Number(i.data);
        } else if (i.zone === zones2[3]) {
          arr2_4[1] = arr2_4[1] + Number(i.data);
        } else if (i.zone === zones2[4]) {
          arr2_5[1] = arr2_5[1] + Number(i.data);
        } else if (i.zone === zones2[5]) {
          arr2_6[1] = arr2_6[1] + Number(i.data);
        } else if (i.zone === zonesAll) {
          arrAll[1] = Number(i.data);
        }
        i.gbname = "체류시간";
        excels.push(i);
      }

      //zones1s
      arrY1_1[3] = Math.round(Number(arr1_1[1]) / 60 / dateCnt);
      arrY1_2[3] = Math.round(Number(arr1_2[1]) / 60 / dateCnt);
      arrY1_3[3] = Math.round(Number(arr1_3[1]) / 60 / dateCnt);
      arrY1_4[3] = Math.round(Number(arr1_4[1]) / 60 / dateCnt);
      arrY1_5[3] = Math.round(Number(arr1_5[1]) / 60 / dateCnt);
      arrY1_6[3] = Math.round(Number(arr1_6[1]) / 60 / dateCnt);
      arrY1_7[3] = Math.round(Number(arr1_7[1]) / 60 / dateCnt);
      arrY1_8[3] = Math.round(Number(arr1_8[1]) / 60 / dateCnt);
      //zones2
      arrY2_1[3] = Math.round(Number(arr2_1[1]) / 60 / dateCnt);
      arrY2_2[3] = Math.round(Number(arr2_2[1]) / 60 / dateCnt);
      arrY2_3[3] = Math.round(Number(arr2_3[1]) / 60 / dateCnt);
      arrY2_4[3] = Math.round(Number(arr2_4[1]) / 60 / dateCnt);
      arrY2_5[3] = Math.round(Number(arr2_5[1]) / 60 / dateCnt);
      arrY2_6[3] = Math.round(Number(arr2_6[1]) / 60 / dateCnt);

      arrYAll[3] = Math.round(Number(arrAll[1]) / dateCnt / 24);
    } catch (err) {
      console.error(err);
    }
    //zones1
    setZoneInfo1_1(arrY1_1);
    setZoneInfo1_2(arrY1_2);
    setZoneInfo1_3(arrY1_3);
    setZoneInfo1_4(arrY1_4);
    setZoneInfo1_5(arrY1_5);
    setZoneInfo1_6(arrY1_6);
    setZoneInfo1_7(arrY1_7);
    setZoneInfo1_8(arrY1_8);
    //zones2
    setZoneInfo2_1(arrY2_1);
    setZoneInfo2_2(arrY2_2);
    setZoneInfo2_3(arrY2_3);
    setZoneInfo2_4(arrY2_4);
    setZoneInfo2_5(arrY2_5);
    setZoneInfo2_6(arrY2_6);

    setAllInfo(arrYAll);

    setExcelData(excels);
  };

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: LOAD_ARDATA_REQUEST,
      data: { sttdate, enddate },
    });
  }, []);

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
    dispatch({
      type: LOAD_ARDATA_REQUEST,
      data: { sttdate, enddate },
    });
  };
  //통계청 년 선택
  const onClickYear = useCallback((e) => {
    setSelectYear(e.target.value);
  });
  const onClickMonth = useCallback((e) => {
    setSelectMonth(e.target.value);
  });

  //년 나오게
  for (var i = 2023; i <= curYear; i++) {
    selectList.push(i);
  }
  //기간선택후 검색 클릭시
  const searchStastic = () => {
    setLoding(true);
    const excelStastics = [];
    const getAPIStastics = async () => {
      try {
        const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/MonthStatistics?year=${selectYear}&month=${selectMonth}`);

        for (let i of responseVisit.data) {
          // i.gbname = "황리단길 통계청자료";
          excelStastics.push(i);
        }
        setStatisticsExcelData(excelStastics);
        setLoding(false);
      } catch (err) {
        console.error(err);
      }
    };
    getAPIStastics();
  };

  return (
    <Background>
      <div className="lightback">
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
          <Header page={"0"} />
          <Nav value={"3"} bottomValue={"2"} />
          <div className="researchBox" style={{ display: "flex", marginLeft: "5.5%", marginRight: "5.5%" }}>
            <div></div>

            <div className="Sel_date">
              <b>유동인구</b> 분석기간 &nbsp;
              <input type="date" className="currentDateInput" value={sttdate} onChange={(e) => setSttdate(e.target.value)} />
              &nbsp;&nbsp;~&nbsp;&nbsp;
              <input type="date" className="currentDateInput" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
              &nbsp;
              <button type="button " className="button" onClick={searchHandler}>
                {" "}
                검 색{" "}
              </button>
              <button type="button" className="button">
                <CSVLink
                  className="csv"
                  data={excelData}
                  filename={"유동인구데이터-" + sttdate + "-" + enddate}
                  onClick={(event) => {
                    // return false; // ???? You are stopping the handling of component
                  }}
                >
                  다운로드
                </CSVLink>
              </button>
              {/* <button type="button" className="button">
              <CSVLink
                className="csv"
                data={floatpepleExecels}
                filename={"시간별유동인구데이터-" + sttdate + "-" + enddate}
                onClick={(event) => {
                  var datediff = (new Date(enddate)-new Date(sttdate))/(24*60*60*1000);
                  if (datediff > 7){
                    alert('시간별 유동인구 데이터는 분석 기간을 7일 이하로 선택해주세요')
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                시간별유동인구
              </CSVLink>
            </button> */}
            </div>
            <div></div>
            <div></div>
          </div>
          <StackStatistics className="stackinfo" Info={allInfo} theme="light" />
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div>
                <div className="division">
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_1} zoneName="영일대해수욕장/해상누각" zoneIndex="10" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_2} zoneName="스페이스워크(환호공원)" zoneIndex="11" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_3} zoneName="해상스카이워크" zoneIndex="12" theme="light" />
                </div>
                <div className="division">
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_4} zoneName="송도해수욕장" zoneIndex="13" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_5} zoneName="송도송림테마거리(솔밭도시숲)" zoneIndex="14" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_6} zoneName="이가리 닻 전망대" zoneIndex="15" theme="light" />
                </div>
                <div className="division">
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_7} zoneName="사방기념공원" zoneIndex="16" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_8} zoneName="내연산/보경사" zoneIndex="17" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_1} zoneName="연오랑세오녀 테마공원(귀비고)" zoneIndex="6" theme="light" />
                </div>
              </div>
              <div>
                <div className="division">
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_2} zoneName="호미곶 해맞이광장" zoneIndex="1" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_3} zoneName="구룡포 일본인가옥거리" zoneIndex="2" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_4} zoneName="오어사" zoneIndex="3" theme="light" />
                </div>
                <div className="division">
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_5} zoneName="일월문화공원" zoneIndex="4" theme="light" />
                  <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo2_6} zoneName="장기유배문화체험촌" zoneIndex="5" theme="light" />
                </div>
              </div>
            </Slider>
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

export default Floatpopulation;
