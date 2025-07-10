import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Head from "next/head";

import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import Status from "../../components/info/Status";
import ZoneInfo from "../../components/info/ZoneInfo";
import NavBottom from "../../components/common/NavBottom";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import { LOAD_ZONELISTS_REQUEST } from "../../reducers/scanner";
import wrapper from "../../store/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Background = styled.div`
  background-color: black;
  font-family: "Pretendard", sans-serif;

  .iframeBox {
    width: 100%;
    height: 830px;
  }
  .iframe {
    width: 100%;
    height: 100%;
  }
  .compare_list {
    width: 99%;
    height: 100%;
    float: center;
    margin: 0 0 0 0;
    padding: 0px 5px 0 10px;
  }
  .division {
    background-color: black;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
  }

  .slick-dots {
    margin-top: 100px;
    background-color: black;
    padding: 10px 0;
    position: absolute;
    bottom: -30px;
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

const Compare = () => {
  const dispatch = useDispatch();
  const slideEl = useRef(null);
  const [settings, setSettings] = useState({});
  const { me, yearFirst, today, yesterday, monthFirst } = useSelector((state) => state.auth);
  const { zonedatas } = useSelector((state) => state.scanner);

  const zoneDatass = zonedatas;

  const zoneData = zoneDatass.map((data) => ({
    //존정보 불러온 값에 데이터 초기화하여 넣기
    ...data,
    todayData: 0,
    monthData: 0,
    yearData: 0,
    peopleCntData: 0,
    poepleStayData: 0,
    revisitData: 0,
  }));

  const zoneMap = new Map();
  const zoneNames = [
    //존이름, index색
    [
      [
        ["내연산/보경사", "1"],
        ["스페이스워크", "2"],
        ["해상스카이워크", "3"],
      ],
      [
        ["송도해수욕장", "4"],
        ["송림테마거리", "5"],
        ["사방기념공원", "6"],
      ],
      [
        ["일본인가옥거리", "8"],
        ["연오랑세오녀", "9"],
        ["오어사", "10"],
      ],
    ],
    [
      [
        ["일월문화공원", "12"],
        ["장기유배체험촌", "13"],
        ["영일대해수욕장", "14"],
        ["이가리닻전망대", "11"],
        ["호미곶 광장", "15"],
      ],
    ],
  ];

  // 데이터 초기화
  for (let i of zoneData) {
    zoneMap.set(i.zonename, [0, 0, 0, 0, 0, 0]);
  }

  const [zoneInfo, setZoneInfo] = useState(zoneMap);
  const [zoneInfo1, setZoneInfo1] = useState([0, 0, 0, 0, 0, 0]); //동기화 시키기 위한

  const getAPIdata = async () => {
    // 데이터 받아오기
    /**
     * 오늘자 방문객 그래프
     */

    let zoneStirng;
    try {
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);

      //const responseToday = testss;
      for (let i of responseToday.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone == zoneStirng) {
            //console.log('들어옴',i.zone , n.zone)
            zone.todayData = i.data;
            //console.log(i.zone , n.zone)
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    /**
     * 이달의 누적 방문객 그래프
     */
    try {
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);
      const responseYesterdayStack = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${monthFirst}&to=${today}`);

      for (let i of responseYesterdayStack.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone == zoneStirng) {
            zone.monthData = Number(zone.monthData) + Number(i.data);
            continue;
          }
        }
      }
      for (let i of responseToday.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone == zoneStirng) {
            zone.monthData = Number(zone.monthData) + Number(i.data);
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    /*
     * 금년도 누적방문객
     */
    try {
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);
      const responseYesterdayStack = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountDay?from=${yearFirst}&to=${today}`);

      for (let i of responseYesterdayStack.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone === zoneStirng) {
            zone.yearData = zone.yearData + Number(i.data);
            continue;
          }
        }
      }
      for (let i of responseToday.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone === zoneStirng) {
            zone.yearData = zone.yearData + Number(i.data);
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류인원 그래프
     */
    try {
      const responseStay = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`);

      for (let i of responseStay.data) {
        for (let j of zoneData) {
          zoneStirng = String(j.zone);
          if (i.zone === zoneStirng) {
            j.peopleCntData = i.data;
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    /**
     * 체류시간 그래프
     */
    try {
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime`);
      for (let i of responseTime.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone === zoneStirng) {
            zone.poepleStayData = Math.round(i.data / 60);
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    /**
     * 재방문 그래프
     */
    try {
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit`);

      for (let i of responseRevisit.data) {
        for (let zone of zoneData) {
          zoneStirng = String(zone.zone);
          if (i.zone === zoneStirng) {
            zone.revisitData = i.data;
            continue;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    //데이터 값 넣기 todayData: 0, monthData: 0, yearData: 0, peopleCntData: 0, poepleStayData: 0, revisitData: 0
    for (let i of zoneData) {
      zoneMap.set(i.zonename, [i.todayData, i.monthData, i.yearData, i.peopleCntData, i.poepleStayData, i.revisitData]);
    }

    const zoneMap2 = zoneMap;
    setZoneInfo(zoneMap2);
    setZoneInfo1(zoneInfo.get("불국사")); // 업데이트를 위한
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

  return (
    <Background>
      <div className={"lightback"}>
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
          <Header page={"0"} />
          <Nav value={"3"} bottomValue={"1"} />
          <Status theme={"light"} />
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              {zoneNames.map((item) => (
                <div>
                  {item.map((items) => (
                    <div className="division">
                      {items.map((zones) => (
                        <ZoneInfo className="zonebox" zoneInfo={zoneInfo.get(zones[0])} zoneName={zones[0]} zoneIndex={zones[1]} theme={"light"} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
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
  store.dispatch({
    type: LOAD_ZONELISTS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Compare;
