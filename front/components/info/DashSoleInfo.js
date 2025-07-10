// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들
//api 불러와서 바로 적용
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Image from "next/image";

import red_icon from "../../public/images/scanner_rd.png";
import orange_icon from "../../public/images/scanner_or.png";
import green_icon from "../../public/images/scanner_gr.png";
import yellow_icon from "../../public/images/scanner_yl.png";
import blue_icon from "../../public/images/scanner_bl.png";
import brown_icon from "../../public/images/scanner_br.png";
import purple_icon from "../../public/images/scanner_pu.png";

import wrapper from "../../store/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//인디케이터 디자인
const Block = styled.div`
  .dark {
    .fpa_box {
      background-color: #3c496e;
      box-shadow: 0px 0px 0px #cccccc;
    }
    .fpa_box_table {
      background-color: #3c496e;
      border-radius: 7px;
    }
    .fpa_title {
      font-size: 15px;
      color: white;
    }

    .td {
      border-right: solid 1px #526395;
    }
    .fpa_box_table .td:nth-child(1) {
      border-left: solid 0;
    }
    .fpa_box_table .td:nth-child(6) {
      border-right: solid 0;
    }
    .fpa_num1 {
      font-size: 14px;
      color: white;
    }
    .fpa_num2 {
      font-size: 14px;
      color: white;
    }
    .fpa_num3 {
      font-size: 14px;
      margin: 0 0 0 5px;
      color: #e5004f;
    }

    .fpa_num3_1 {
      font-size: 14px;
      margin: 0 0 0 5px;
      color: #00b7ee;
    }
    .fpa_num4 {
      font-size: 14px;
      color: white;
    }
  }

  .onclickalldevice {
    background: rgba(255, 255, 255, 0);
    border: none;
    font-size: 15px;
    color: white;
  }
`;

const StatusBlock = styled.div`
  .fpa_box {
    width: 95%;
    margin: 10px 2.5% 0px 2.5%;
    background-color: #72c5ee;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .back_0 {
    background-color: #6babf1;
  }
  .back_1 {
    background-color: #69b1f3;
  }
  .back_2 {
    background-color: #6cbbf0;
  }
  .back_3 {
    background-color: #72c5ee;
  }
  .back_4 {
    background-color: #6eccdc;
  }
  .back_5 {
    background-color: #6cd0d1;
  }
  .back_6 {
    background-color: #6bd3cd;
  }
  .back_7 {
    background-color: #69d7c2;
  }

  .division {
    display: flex;
    margin: 0;
  }

  .icon {
    width: 40px;
    height: 45px;
    margin-top: 4px;
    margin-left: 5px;
  }

  .fpa_box_table {
    width: 100%;
    //height: 100%;
    text-align: center;
  }

  .fpa_box_table .tr {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1fr 1fr;
    margin: 1px 5px 0px 0;
    height: 100%;
    line-height: 300%;
    .fpa_title {
      font-size: 16px;
      color: white;
    }
    .first {
      display: flex;
    }
  }
  .fpa_box_table .trDevice {
    display: grid;
    grid-template-columns: 1fr 1fr;
    line-height: 150%;
    margin: 0;
    .fpa_title {
      font-size: 15px;
      color: white;
    }
  }
  .tr .td {
    border-right: solid 1px white;
  }
  .fpa_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .fpa_box_table .tr .td:nth-child(4) {
    border-right: solid 0;
  }

  .onclickdevice {
    cursor: pointer;
  }
`;

function DashSoleInfo({ theme, zone, scanners, zonedatas }) {
  const { me } = useSelector((state) => state.auth); //Redux에서 사용자 정보 가져오기
  const slideEl = useRef(null); // 슬라이더 참조
  const [settings, setSettings] = useState({}); // 슬라이더 설정 상태
  const [allDeviceStatus, setAllDeviceStatus] = useState(false); // 모든 장비 상태 보기 여부

  //초기 존 데이터 설정
  const zoneData = zonedatas.map((data) => ({
    // 존정보 불러온 값에 데이터 초기화하여 넣기
    ...data,
    todayVisit: 0,
    revisit: 0,
    stay: 0,
    todayVisitTemp: 0,
    revisitTime: "2024-04-24T10:50:00.000Z",
    stayTime: "2024-04-24T10:50:00.000Z",
    good: 0,
    error: 0,
  }));

  const zoneVisitMap = new Map(); // 방문객 수 저장
  const zoneDataMap = new Map(); // 장비 상태 저장
  const areaZones = new Map(); // 권역별 존 정보
  const zoneColor = new Map(); // 존별 이름 및 색상

  // 방문객 데이터 초기화
  for (let i of zoneData) {
    zoneVisitMap.set(i.zonename, [0, 0, 0]); // [금일방문객, 재방문객, 체류시간]
  }

  // 디바이스 데이터 초기화
  for (let i of zoneData) {
    zoneDataMap.set(i.zone, { good: 0, error: 0 });
  }

  // 존별 이름 및 색상
  for (let i of zoneData) {
    const colorMap = {
      red: red_icon,
      orange: orange_icon,
      yellow: yellow_icon,
      green: green_icon,
      purple: purple_icon,
    };
    zoneColor.set(i.zonename, { zone: i.zone, color: colorMap[i.boundcolor] });
  }

  // 권역별 존 정보 넣기
  areaZones.set("영일대 권역", ["영일대해수욕장", "스페이스워크", "해상스카이워크"]);
  areaZones.set("송도해수욕장 권역", ["송도해수욕장", "송림테마거리"]);
  areaZones.set("이가리 권역", ["이가리닻전망대", "사방기념공원"]);
  areaZones.set("내연산/보경사", ["내연산/보경사"]);
  areaZones.set("호미곶면 권역", ["연오랑세오녀", "호미곶 광장", "일본인가옥거리"]);
  areaZones.set("남포항 권역", ["오어사", "일월문화공원", "장기유배체험촌"]);

  // 상태 변수 초기화
  const [zoneInfoAll, setZoneInfoAll] = useState(zoneVisitMap);
  const [deviceAll, setDeviceAll] = useState(zoneDataMap);

  // 비동기로 api 호출, 데이터 가져오기
  const fetchData = async () => {
    await Promise.all([getAPIdata1(), getAPIdata2(), getAPIdata3(), getDeviceStatus()]);
  };

  // 오늘 방문객 수 데이터 가져오기
  const getAPIdata1 = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);

      for (let i of response.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.data > j.todayVisitTemp) {
            j.todayVisit = i.data;
            j.todayVisitTemp = i.data;
            continue;
          }
        }
      }

      for (let i of zoneData) {
        zoneVisitMap.set(i.zonename, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
      }
      setZoneInfoAll(new Map(zoneVisitMap));
    } catch (err) {
      console.error(err);
      setTimeout(getAPIdata1, 2000);
    }
  };

  const getAPIdata2 = async () => {
    // 재방문객 데이터 가져오기
    try {
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountRevisit`);

      for (let i of response2.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.revisitTime) {
            j.revisit = i.data;
            j.revisitTime = i.time;
            continue;
          }
        }
      }

      for (let i of zoneData) {
        zoneVisitMap.set(i.zone, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
      }
      setZoneInfoAll(new Map(zoneVisitMap));
    } catch (err) {
      console.error(err);
      setTimeout(getAPIdata2, 2000);
    }
  };

  const getAPIdata3 = async () => {
    // 체류시간 데이터 가져오기
    try {
      const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceResidenceTime`);

      for (let i of response3.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.stayTime) {
            j.stay = Math.round(i.data / 60); // 분단위로 표시하기 위해 60으로 나누고, 소수점 반올림
            j.stayTime = i.time;
            continue;
          }
        }
      }

      for (let i of zoneData) {
        zoneVisitMap.set(i.zonename, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
      }
      setZoneInfoAll(new Map(zoneVisitMap));
    } catch (err) {
      console.error(err);
      setTimeout(getAPIdata3, 2000);
    }
  };
  // 필요시 주석풀기
  // const getDeviceStatus = async () => {
  //   // 장비 상태 데이터 가져오기
  //   try {
  //     const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
  //     const resultData = deviceResponse.data;
  //     const forceErrorMacs = ["D8659504102C"];

  //     for (var i of resultData) {
  //       for (var j of scanners) {
  //         if (i.MAC == j.mac) {
  //           if (i.ALIVE === 1) {
  //             zoneDataMap.set(j.zone, { good: zoneDataMap.get(j.zone).good + 1, error: zoneDataMap.get(j.zone).error });
  //           } else if (i.ALIVE === 0) {
  //             zoneDataMap.set(j.zone, { good: zoneDataMap.get(j.zone).good, error: zoneDataMap.get(j.zone).error + 1 });
  //           }
  //           continue;
  //         }
  //       }
  //     }
  //     setDeviceAll(new Map(zoneDataMap));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getDeviceStatus = async () => {
    // 장비 상태 데이터 가져오기
    try {
      const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`);
      const resultData = deviceResponse.data;
      const forceErrorMacs = ["D8659504102C"];

      for (var i of resultData) {
        for (var j of scanners) {
          if (i.MAC === j.mac) {
            // forceErrorMacs에 포함된 MAC 주소라면 무조건 good 처리
            if (forceErrorMacs.includes(i.MAC)) {
              zoneDataMap.set(j.zone, {
                good: zoneDataMap.get(j.zone).good + 1,
                error: zoneDataMap.get(j.zone).error,
              });
            }
            // 일반적인 장비 상태 처리
            else {
              if (i.ALIVE === 1) {
                zoneDataMap.set(j.zone, {
                  good: zoneDataMap.get(j.zone).good + 1,
                  error: zoneDataMap.get(j.zone).error,
                });
              } else if (i.ALIVE === 0) {
                zoneDataMap.set(j.zone, {
                  good: zoneDataMap.get(j.zone).good,
                  error: zoneDataMap.get(j.zone).error + 1,
                });
              }
            }
            continue;
          }
        }
      }
      setDeviceAll(new Map(zoneDataMap));
    } catch (err) {
      console.error(err);
    }
  };

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
      autoplaySpeed: 4000,
    });
    fetchData();
    const intervals = [setInterval(getAPIdata1, 900000), setInterval(getAPIdata2, 900000), setInterval(getAPIdata3, 900000), setInterval(getDeviceStatus, 1800000)];

    return () => intervals.forEach(clearInterval);
  }, []);

  const onClickAllZoneDevice = () => {
    setAllDeviceStatus(!allDeviceStatus);
  };

  const Box = ({ name, zoneInfos, zoneName, back, colorss }) => {
    const [deviceStatus, setDeviceStatus] = useState(false);
    const makeNumber = (param) => {
      return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const onClickZoneDevice = () => {
      setDeviceStatus(!deviceStatus);
    };
    return (
      <div className={`fpa_box ${back}`} style={{ background: "linear-gradient(to bottom, #44A9FF, #4165E5)" }}>
        <div className="fpa_box_table">
          <div className="tr">
            <div className="td onclickdevice">
              <span className="fpa_title first" onClick={onClickZoneDevice}>
                <div className="icon">
                  <Image src={colorss} />
                </div>
                {name}{" "}
              </span>
            </div>
            <div className="td">
              <span className="fpa_title">{zoneInfos ? makeNumber(Number(zoneInfos[0])) + "명" : "-"}</span>
            </div>
            <div className="td">
              <span className="fpa_title">{zoneInfos ? makeNumber(Number(zoneInfos[1])) + "명" : "-"}</span>
            </div>
            <div className="td">
              <span className="fpa_title">{zoneInfos ? makeNumber(Number(zoneInfos[2])) + "분" : "-"}</span>
            </div>
          </div>
          {deviceStatus || allDeviceStatus ? (
            <div className="trDevice">
              <div className="td">
                <span className="fpa_title">정상 : {deviceAll.get(zoneName).good}대</span>
              </div>
              <div className="td">
                <span className="fpa_title">고장 : {deviceAll.get(zoneName).error}대</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  return (
    <Block>
      <div className="column">
        <button className="tr onclickalldevice" onClick={onClickAllZoneDevice} style={{ fontWeight: "600" }}>
          개소명
        </button>
        <div className="tr" style={{ color: "white", fontWeight: "600" }}>
          금일방문
        </div>
        <div className="tr" style={{ color: "white", fontWeight: "600" }}>
          재방문
        </div>
        <div className="tr" style={{ color: "white", fontWeight: "600" }}>
          체류시간
        </div>
      </div>
      <div className="lightback">
        <StatusBlock className="light">
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div>
                {areaZones.get(zone).map((area, index) => (
                  <div className="division" key={index}>
                    <Box
                      name={zonedatas ? area : ""}
                      zoneInfos={zonedatas ? zoneInfoAll.get(area) : ""}
                      zoneName={zoneColor.get(area) ? zoneColor.get(area).zone : ""}
                      back={`back_${index}`}
                      colorss={zoneColor.get(area) ? zoneColor.get(area).color : ""}
                    />
                  </div>
                ))}
              </div>
            </Slider>
          </div>
        </StatusBlock>
      </div>
    </Block>
  );
}

export default DashSoleInfo;
