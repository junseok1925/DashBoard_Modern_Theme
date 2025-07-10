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
      font-weight: normal;
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
      font-size: 22px;
      font-weight: normal;
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
    font-weight: bold;
    font-size: 15px;
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
    background-color: rgb(0, 0, 0);
  }
  .back_1 {
    background-color: rgb(0, 0, 0);
  }
  .back_2 {
    background-color: rgb(0, 0, 0);
  }
  .back_3 {
    background-color: rgb(0, 0, 0);
  }
  .back_4 {
    background-color: rgb(0, 0, 0);
  }
  .back_5 {
    background-color: rgb(0, 0, 0);
  }
  .back_6 {
    background-color: rgb(0, 0, 0);
  }
  .back_7 {
    background-color: rgb(0, 0, 0);
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
      font-size: 17.5px;
      color: white;
      font-weight: 500;
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
      font-weight: 500;
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
  //const { me } = useSelector((state) => state.auth);
  const slideEl = useRef(null);
  const [settings, setSettings] = useState({});
  const [allDeviceStatus, setAllDeviceStatus] = useState(false);

  const zoneData = zonedatas.map((data) => ({
    //존정보 불러온 값에 데이터 초기화하여 넣기
    ...data,
    todayVisit: 0,
    revisit: 0,
    stay: 0,
    todayVisitTemp: 0,
    revisitTime: "2021-04-24T10:50:00.000Z",
    stayTime: "2021-04-24T10:50:00.000Z",
    good: 0,
    error: 0,
  }));

  const zoneVisitMap = new Map(); //방문객수 API 가져온 데이터 저장
  const zoneDataMap = new Map(); //장비상태 API 가져온 데이터 저장
  const areaZones = new Map(); // 권역별 존정보
  const zoneColor = new Map(); // 존별 이름 및 색상

  //방문객 데이터 초기화
  for (let i of zoneData) {
    zoneVisitMap.set(i.zonename, [0, 0, 0]); // [금일방문객, 재방문객, 체류시간]
  }

  // 디바이스 데이터 초기화
  for (let i of zoneData) {
    zoneDataMap.set(i.zone, { good: 0, error: 0 });
    //console.log('good',zoneDataMap.get(i.zone).good)
  }

  //존별 이름 및 색상a
  for (let i of zoneData) {
    if (i.boundcolor == "red") {
      zoneColor.set(i.zonename, { zone: i.zone, color: red_icon });
    } else if (i.boundcolor == "orange") {
      zoneColor.set(i.zonename, { zone: i.zone, color: orange_icon });
    } else if (i.boundcolor == "yellow") {
      zoneColor.set(i.zonename, { zone: i.zone, color: yellow_icon });
    } else if (i.boundcolor == "green") {
      zoneColor.set(i.zonename, { zone: i.zone, color: green_icon });
    } else if (i.boundcolor == "blue") {
      zoneColor.set(i.zonename, { zone: i.zone, color: blue_icon });
    } else if (i.boundcolor == "purple") {
      zoneColor.set(i.zonename, { zone: i.zone, color: purple_icon });
    } else if (i.boundcolor == "brown") {
      zoneColor.set(i.zonename, { zone: i.zone, color: brown_icon });
    }
  }

  // 권역별 존정보 넣기
  areaZones.set("부평시장", ["부평시장", "문화의 거리", "풍물대축제"]);

  const [zoneInfoAll, setZoneInfoAll] = useState(zoneVisitMap);
  const [zoneInfo11, setZoneInfo11] = useState(0); //데이터 적용하기 위한
  const [zoneColors, setZoneColors] = useState();
  const [deviceAll, setDeviceAll] = useState(zoneDataMap);
  const [deviceEx, setDeviceEx] = useState(0);

  const getAPIdata1 = async () => {
    // 오늘 누적방문객
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`); //오늘누적
      // 임시api
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`); //오늘누적
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
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      setZoneInfo11(zoneInfoAll.get("불국사"));

      //console.log('마지막1',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };

  const getAPIdata12 = async () => {
    // 오늘 누적방문객
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`); //오늘누적
      // 임시api
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL2}/DeviceCountHourly?unit=1d-1h`); //오늘누적
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
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      setZoneInfo11(zoneInfoAll.get("불국사"));

      //console.log('마지막1',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };

  const getAPIdata2 = async () => {
    try {
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`); //재방문
      // console.log(response2);

      var tempTime = "2021-04-24T10:50:00.000Z";

      for (let i of response2.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.revisitTime) {
            //console.log('들어옴')
            j.revisit = i.data;
            j.revisitTime = i.time;
            continue;
          }
        }
      }

      for (let i of zoneData) {
        zoneVisitMap.set(i.zone, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      //console.log('마지막2',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };

  const getAPIdata22 = async () => {
    try {
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL2}/DeviceCountRevisit`); //재방문
      // console.log(response2);

      var tempTime = "2021-04-24T10:50:00.000Z";

      for (let i of response2.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.revisitTime) {
            //console.log('들어옴')
            j.revisit = i.data;
            j.revisitTime = i.time;
            continue;
          }
        }
      }

      for (let i of zoneData) {
        zoneVisitMap.set(i.zone, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      //console.log('마지막2',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };

  const getAPIdata3 = async () => {
    try {
      const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime`); //평균체류인원
      var tempTime = "2021-04-24T10:50:00.000Z";

      for (let i of response3.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.stayTime) {
            j.stay = Math.round(i.data / 60); // 분단위로 표시하기 위해 60으로 나누고, 소수점 반올림
            j.stayTime = i.time;
            continue;
          }
        }
      }

      //데이터 넣기
      for (let i of zoneData) {
        zoneVisitMap.set(i.zonename, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      //console.log('마지막3',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };
  const getAPIdata32 = async () => {
    try {
      const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL2}/DeviceResidenceTime`); //평균체류인원
      var tempTime = "2021-04-24T10:50:00.000Z";

      for (let i of response3.data) {
        for (let j of zoneData) {
          if (i.zone == j.zone && i.time > j.stayTime) {
            j.stay = Math.round(i.data / 60); // 분단위로 표시하기 위해 60으로 나누고, 소수점 반올림
            j.stayTime = i.time;
            continue;
          }
        }
      }

      //데이터 넣기
      for (let i of zoneData) {
        zoneVisitMap.set(i.zonename, [i.todayVisit, i.revisit, i.stay]); // [금일방문객, 재방문객, 체류시간]
        //console.log(i.todayVisit, i.revisit, i.stay)
      }
      setZoneInfoAll(zoneVisitMap);
      //console.log('마지막3',zoneInfoAll)
    } catch (err) {
      console.error(err);
    }
  };
  // console.log('zoneData',zoneData);

  const getDeviceStatus = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const date = year + "-" + month + "-" + day;

    try {
      const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceStatus`);

      const resultData = deviceResponse.data;

      for (var i of resultData) {
        for (var j of scanners) {
          if (i.MAC == j.mac) {
            // API 맥주소와 DB 스캐너 맥주소가 같을 때
            if (i.ALIVE == 1) {
              // 살아있으면 good +1
              zoneDataMap.set(j.zone, {
                good: zoneDataMap.get(j.zone).good + 1,
                error: zoneDataMap.get(j.zone).error,
              });
            } else {
              // 그외 error+1
              zoneDataMap.set(j.zone, {
                good: zoneDataMap.get(j.zone).good,
                error: zoneDataMap.get(j.zone).error + 1,
              });
            }
            continue;
          }
        }
      }
      setDeviceAll(zoneDataMap);
      setDeviceEx(0);
      //setZoneInfo11(zoneInfoAll.get('불국사'));
    } catch (err) {
      console.error(err);
    }
  };

  const getDeviceStatus2 = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const date = year + "-" + month + "-" + day;

    try {
      const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL2}/DeviceStatus`);

      const resultData = deviceResponse.data;

      for (var i of resultData) {
        for (var j of scanners) {
          if (i.MAC == j.mac) {
            // API 맥주소와 DB 스캐너 맥주소가 같을 때
            if (i.ALIVE == 1) {
              // 살아있으면 good +1
              zoneDataMap.set(j.zone, {
                good: zoneDataMap.get(j.zone).good + 1,
                error: zoneDataMap.get(j.zone).error,
              });
            } else {
              // 그외 error+1
              zoneDataMap.set(j.zone, {
                good: zoneDataMap.get(j.zone).good,
                error: zoneDataMap.get(j.zone).error + 1,
              });
            }
            continue;
          }
        }
      }
      setDeviceAll(zoneDataMap);
      setDeviceEx(0);
      //setZoneInfo11(zoneInfoAll.get('불국사'));
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
      autoplaySpeed: 4000, // 4000
    });
    getAPIdata1();
    getAPIdata2();
    getAPIdata3();
    getDeviceStatus();
    setInterval(getAPIdata1, 900000);
    setInterval(getAPIdata2, 900000);
    setInterval(getAPIdata3, 900000);
    setInterval(getDeviceStatus, 1800000);
    getAPIdata12();
    getAPIdata22();
    getAPIdata32();
    getDeviceStatus2();
    setInterval(getAPIdata12, 900000);
    setInterval(getAPIdata22, 900000);
    setInterval(getAPIdata32, 900000);
    setInterval(getDeviceStatus2, 1800000);
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
      <div className={"fpa_box " + back}>
        <div className="fpa_box_table">
          <div className="tr">
            <div className="td onclickdevice">
              <span className="fpa_title first" onClick={onClickZoneDevice}>
                <div className="icon">
                  <Image src={colorss} />
                  {/* <img src= "/public/images/scanner_rd.png" /> */}
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
        <button className="tr onclickalldevice fontt" onClick={onClickAllZoneDevice}>
          개소명
        </button>
        <div className="tr onclickalldevice">금일방문</div>
        <div className="tr onclickalldevice">재방문</div>
        <div className="tr onclickalldevice">체류시간</div>
      </div>
      <div className="lightback">
        <StatusBlock className="light">
          <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div>
                {zonedatas
                  ? areaZones.get(zone).map((area, index) => (
                      <div className="division">
                        <Box
                          name={zonedatas ? area : ""}
                          zoneInfos={zonedatas ? zoneInfoAll.get(area) : ""}
                          zoneName={zoneColor.get(area) ? zoneColor.get(area).zone : ""}
                          back={"back_" + index}
                          colorss={zoneColor.get(area) ? zoneColor.get(area).color : ""}
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </Slider>
          </div>
        </StatusBlock>
      </div>
    </Block>
  );
}

export default DashSoleInfo;
