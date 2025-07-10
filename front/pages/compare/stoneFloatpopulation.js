import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { CSVLink, CSVDownload } from "react-csv";
import Head from "next/head";

import Header from "../../components/common/StoneHeader";
import Nav from "../../components/common/StoneNav";
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
  background-color: #f6f9fe;
  .researchBox {
    display: grid;
    grid-template-columns: 1fr 17fr 1fr;
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

  const [allInfo, setAllInfo] = useState([0, 0, 0, 0, 0]);
  const [excelData, setExcelData] = useState([]);
  const [statisticseExcelData, setStatisticsExcelData] = useState([]);
  const [settings, setSettings] = useState({});
  const slideEl = useRef(null);
  const [floatpepleExecels, setFloatpepleExecels] = useState([]);
  const [densityExecels, setDensityExecels] = useState([]);

  const zones1 = ["벚꽃놀이터", "FnB", "프리마켓", "친환경 쉼터", "라이트쇼"];

  const zonesAll = "경주돌담길 전체";
  //zones1의 zoneid
  const zoneids1 = [2070, 2071, 2072, 2073, 2074, 2075];

  const arrY1_1 = [0, 0, 0, 0];
  const arrY1_2 = [0, 0, 0, 0];
  const arrY1_3 = [0, 0, 0, 0];
  const arrY1_4 = [0, 0, 0, 0];
  const arrY1_5 = [0, 0, 0, 0];

  const arrYAll = [0, 0, 0, 0]; //경주돌담길 전체

  const excels = [];
  const excels2 = [];
  const excels3 = [];
  // const floatpepleExecels = JSON.parse(JSON.stringify(logs));
  // console.log("엑셀데이터는?", floatpepleExecels);
  // if (floatpepleExecels) {
  //   for (let i of floatpepleExecels) {
  //     // zones1
  //     if (i.zone_id == zoneids1[0]) {
  //       i.zone_id = zones1[0];
  //     } else if (i.zone_id == zoneids1[1]) {
  //       i.zone_id = zones1[1];
  //     } else if (i.zone_id == zoneids1[2]) {
  //       i.zone_id = zones1[2];
  //     } else if (i.zone_id == zoneids1[3]) {
  //       i.zone_id = zones1[3];
  //     } else if (i.zone_id == zoneids1[4]) {
  //       i.zone_id = zones1[4];
  //     } else if (i.zone_id == zoneids1[5]) {
  //       i.zone_id = zones1[5];
  //     }
  //   }
  // }

  const getAPIdata = async () => {
    /**
     * 시간별방문객 엑셀데이터 다운을 위해
     */

    try {
      const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDayHour?from=${sttdate}&to=${enddate}`);
      const densityVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DensityDayHour?from=${sttdate}&to=${enddate}`);

      for (let i of responseVisit.data) {
        // zones1
        if (zones1.includes(i.zone) || zonesAll == i.zone) {
          //i.gbname = "방문객수";
          excels2.push(i);
        }
      }
      for (let i of densityVisit.data) {
        // zones1
        if (zones1.includes(i.zone)) {
          //i.gbname = "방문객수";
          excels3.push(i);
        }
      }
      setFloatpepleExecels(excels2);
      setDensityExecels(excels3);
    } catch (err) {
      console.error(err);
    }

    /**
     * 방문객 수
     */

    try {
      const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}T09:00:00`);
      //const responseVisit = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+sttdate+'&to='+enddate);
      //console.log(
      // "방문객 수 API 주소",
      //  `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}%09:00:00`
      //);

      //zones1
      let arr1_1 = ["벚꽃놀이터", 0];
      let arr1_2 = ["FnB", 0];
      let arr1_3 = ["프리마켓", 0];
      let arr1_4 = ["친환경 쉼터", 0];
      let arr1_5 = ["라이트쇼", 0];

      let arrAll = ["경주돌담길 전체", 0];

      for (let i of responseVisit.data) {
        // zones1
        if (zones1.includes(i.zone) || zonesAll == i.zone) {
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
          } else if (i.zone === zonesAll) {
            arrAll[1] = arrAll[1] + Number(i.data);
          }
          i.gbname = "방문객수";
          excels.push(i);
        }
      }
      // zones1
      arrY1_1[0] = arr1_1[1];
      arrY1_2[0] = arr1_2[1];
      arrY1_3[0] = arr1_3[1];
      arrY1_4[0] = arr1_4[1];
      arrY1_5[0] = arr1_5[1];
      arrYAll[0] = arrAll[1];
    } catch (err) {
      console.error(err);
    }

    /**
     * 재방문객 수
     */

    try {
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit?from=${sttdate}&to=${enddate}T09:00:00`);

      // console.log("재방문객 수", `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit?from=${sttdate}&to=${enddate}T09:00:00`);
      //const responseRevisit = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from='+sttdate+'&to='+enddate);

      //zones1
      let arr1_1 = ["벚꽃놀이터", 0];
      let arr1_2 = ["FnB", 0];
      let arr1_3 = ["프리마켓", 0];
      let arr1_4 = ["친환경 쉼터", 0];
      let arr1_5 = ["라이트쇼", 0];

      let arrAll = ["경주돌담길 전체", 0];

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
        } else if (i.zone === zonesAll) {
          arrAll[1] = arrAll[1] + Number(i.data);
        }
        //i.gbname = "재방문객수";
        //excels.push(i);
      }

      // zones1
      arrY1_1[1] = arr1_1[1];
      arrY1_2[1] = arr1_2[1];
      arrY1_3[1] = arr1_3[1];
      arrY1_4[1] = arr1_4[1];
      arrY1_5[1] = arr1_5[1];

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

      // console.log("체류인원 API 주소", `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}T09:00:00`);
      //zones1
      let arr1_1 = ["벚꽃놀이터", 0];
      let arr1_2 = ["FnB", 0];
      let arr1_3 = ["프리마켓", 0];
      let arr1_4 = ["친환경 쉼터", 0];
      let arr1_5 = ["라이트쇼", 0];

      let arrAll = ["경주돌담길 전체", 0];
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
        } else if (i.zone === zonesAll) {
          arrAll[1] = arrAll[1] + Number(i.data);
        }
        //i.gbname = "체류인원";
        //excels.push(i);
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

      arrYAll[2] = Math.round(Number(arrAll[1]) / 24 / dateCnt);
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류시간
     */

    try {
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime?from=${sttdate}&to=${enddate}T09:00:00`);
      //const responseTime = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?from='+sttdate+'&to='+enddate);
      // console.log("체류시간 api 주소", `${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime?from=${sttdate}&to=${enddate}T09:00:00`);
      //zones1
      let arr1_1 = ["벚꽃놀이터", 0];
      let arr1_2 = ["FnB", 0];
      let arr1_3 = ["프리마켓", 0];
      let arr1_4 = ["친환경 쉼터", 0];
      let arr1_5 = ["라이트쇼", 0];

      let arrAll = ["경주돌담길 전체", 0];

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
        } else if (i.zone === zonesAll) {
          arrAll[1] = arrAll[1] + Number(i.data);
        }
        //i.gbname = "체류시간";
        //excels.push(i);
      }
      //zones1s
      arrY1_1[3] = Math.round(Number(arr1_1[1]) / 60 / dateCnt);
      arrY1_2[3] = Math.round(Number(arr1_2[1]) / 60 / dateCnt);
      arrY1_3[3] = Math.round(Number(arr1_3[1]) / 60 / dateCnt);
      arrY1_4[3] = Math.round(Number(arr1_4[1]) / 60 / dateCnt);
      arrY1_5[3] = Math.round(Number(arr1_5[1]) / 60 / dateCnt);

      arrYAll[3] = Math.round(Number(arrAll[1]) / 60 / dateCnt);
    } catch (err) {
      console.error(err);
    }
    //zones1
    setZoneInfo1_1(arrY1_1);
    setZoneInfo1_2(arrY1_2);
    setZoneInfo1_3(arrY1_3);
    setZoneInfo1_4(arrY1_4);
    setZoneInfo1_5(arrY1_5);

    setAllInfo(arrYAll);

    setExcelData(excels);
  };

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_ARDATA_REQUEST,
  //     data: { sttdate, enddate },
  //   });
  // }, []);

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
    // dispatch({
    //   type: LOAD_ARDATA_REQUEST,
    //   data: { sttdate, enddate },
    // });
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
        <Header page={"0"} />
        <Nav value={"3"} bottomValue={"2"} />
        <div className="researchBox">
          <div></div>

          <div className="Sel_date">
            <b>유동인구</b> 분석기간 &nbsp;
            <input type="date" id="currentDate" value={sttdate} onChange={(e) => setSttdate(e.target.value)} />
            &nbsp;&nbsp;~&nbsp;&nbsp;
            <input type="date" id="currentDate2" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
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
                  // console.log("You click the link");
                  // return false; // ???? You are stopping the handling of component
                }}
              >
                다운로드
              </CSVLink>
            </button>
            <button type="button" className="button">
              <CSVLink
                className="csv"
                data={floatpepleExecels}
                filename={"시간별유동인구데이터-" + sttdate + "-" + enddate}
                onClick={(event) => {
                  /*var datediff = (new Date(enddate)-new Date(sttdate))/(24*60*60*1000);
                console.log(datediff);
                if (datediff > 7){
                  alert('시간별 유동인구 데이터는 분석 기간을 7일 이하로 선택해주세요')
                  return false;
                } else {
                  return true;
                }*/
                }}
              >
                시간별유동인구
              </CSVLink>
            </button>
            <button type="button" className="button">
              <CSVLink
                className="csv"
                data={densityExecels}
                filename={"시간별밀집도데이터-" + sttdate + "-" + enddate}
                onClick={(event) => {
                  /*var datediff = (new Date(enddate)-new Date(sttdate))/(24*60*60*1000);
                console.log(datediff);
                if (datediff > 7){
                  alert('시간별 유동인구 데이터는 분석 기간을 7일 이하로 선택해주세요')
                  return false;
                } else {
                  return true;
                }*/
                }}
              >
                시간별밀집도데이터
              </CSVLink>
            </button>
          </div>
        </div>
        <StackStatistics className="stackinfo" Info={allInfo} theme="light" />

        <div className="compare_list">
          <Slider ref={slideEl} {...settings}>
            <div>
              <div className="division">
                <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_1} zoneName="벚꽃놀이터" zoneIndex="10" theme="light" />
                <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_2} zoneName="FnB" zoneIndex="11" theme="light" />
                <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_3} zoneName="프리마켓" zoneIndex="12" theme="light" />
              </div>
              <div className="division">
                <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_4} zoneName="친환경 쉼터" zoneIndex="13" theme="light" />
                <FloatPopulationInfo className="zonebox" zoneInfo={zoneInfo1_5} zoneName="라이트쇼" zoneIndex="14" theme="light" />
              </div>
            </div>
          </Slider>
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
