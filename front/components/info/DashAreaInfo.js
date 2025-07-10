import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

// 인디케이터 디자인
const StatusBlock = styled.div`
  margin-bottom: 15px;
  display: grid;

  .fpa_box {
    width: 98%;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    padding: 5px;
  }

  .all {
    background: linear-gradient(to right, #68d9bd, #75beff);
  }

  .section {
    background-color: #6babf1;
  }

  .fpa_box_table {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 190%;
  }

  .fpa_title {
    font-size: 16px;
    color: white;
  }

  .tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .td {
    border-right: solid 1px white;
  }

  .td:nth-child(3) {
    border-right: solid 0;
  }

  .fpa_num1 {
    font-size: 16px;
    color: white;
  }
`;
const Yeongil = ["영일대해수욕장/해상누각", "스페이스워크(환호공원)", "해상스카이워크"];
const Songdo = ["송도해수욕장", "송도송림테마거리(솔밭도시숲)"];
const Ligari = ["이가리 닻 전망대", "사방기념공원"];
const BogyeongTmp = ["내연산/보경사"];
const Homigot = ["연오랑세오녀 테마공원(귀비고)", "호미곶 해맞이광장", "구룡포 일본인가옥거리"];
const Nampo = ["오어사", "일월문화공원", "장기유배문화체험촌"];
function DashAreaInfo({ zone }) {
  const { me, today } = useSelector((state) => state.auth);
  const [todayVisitorTotal, setTodayVisitorTotal] = useState("0"); // 현재 방문객
  const [mainStackVisitTotal, setMainStackVisitTotal] = useState("0"); // 오늘 방문객
  const [mainMonthlyVisitTotal, setMainMonthlyVisitTotal] = useState("0"); // 이달의 방문객

  // API 데이터 호출을 병렬 처리
  const fetchData = async () => {
    try {
      const [data1, data2, data3] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`), //현재 방문객
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`), // 오늘 방문객
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountMonthly`), // 이달의 방문객
      ]);

      processVisitorData(data1.data, setTodayVisitorTotal, zone, "2021-04-24T10:50:00.000Z");
      processVisitorData(data2.data, setMainStackVisitTotal, zone, "2021-04-24T10:50:00.000Z");
      processMonthlyData(data3.data, setMainMonthlyVisitTotal, zone);
    } catch (err) {
      console.error("API 데이터 호출 실패:", err);
    }
  };

  // 현재, 오늘방문객 데이터 처리
  const processVisitorData = (data, setDataFunction, zone, initialTime) => {
    let latestTime = initialTime;

    // 권역 데이터 초기화
    const dataTotal = {
      "영일대 권역": 0,
      "송도해수욕장 권역": 0,
      "이가리 권역": 0,
      "내연산/보경사": 0,
      "호미곶면 권역": 0,
      "남포항 권역": 0,
    };

    // 시간에 따른 최신 데이터 저장용 객체
    const latestData = {};

    for (let i of data) {
      // 권역에 속하는지 확인
      for (let [key, zones] of Object.entries({
        "영일대 권역": Yeongil,
        "송도해수욕장 권역": Songdo,
        "이가리 권역": Ligari,
        "내연산/보경사": BogyeongTmp,
        "호미곶면 권역": Homigot,
        "남포항 권역": Nampo,
      })) {
        if (zones.includes(i.zone)) {
          const nowData = latestData[i.zone];

          // 최신 데이터 업데이트
          if (!nowData || new Date(i.time) > new Date(nowData.time)) {
            latestData[i.zone] = i;
          }
        }
      }
    }

    // 최신 데이터 합산
    for (let [zone, latest] of Object.entries(latestData)) {
      for (let [key, zones] of Object.entries({
        "영일대 권역": Yeongil,
        "송도해수욕장 권역": Songdo,
        "이가리 권역": Ligari,
        "내연산/보경사": BogyeongTmp,
        "호미곶면 권역": Homigot,
        "남포항 권역": Nampo,
      })) {
        if (zones.includes(zone)) {
          dataTotal[key] += latest.data;
        }
      }
    }

    // 결과 설정
    if (dataTotal[zone] !== undefined) {
      setDataFunction(dataTotal[zone]);
    } else {
      console.warn(`존재하지 않는 zone: ${zone}`);
    }
  };

  // 이달의 방문객
  const processMonthlyData = (data, setDataFunction, zone) => {
    // 권역 데이터 초기화
    const dataTotal = {
      "영일대 권역": 0,
      "송도해수욕장 권역": 0,
      "이가리 권역": 0,
      "내연산/보경사": 0,
      "호미곶면 권역": 0,
      "남포항 권역": 0,
    };

    for (let i of data) {
      // 각 권역(zone)에 포함되는지 확인하고 합산
      for (let [key, zones] of Object.entries({
        "영일대 권역": Yeongil,
        "송도해수욕장 권역": Songdo,
        "이가리 권역": Ligari,
        "내연산/보경사": BogyeongTmp,
        "호미곶면 권역": Homigot,
        "남포항 권역": Nampo,
      })) {
        if (zones.includes(i.zone)) {
          dataTotal[key] += i.data; // 데이터를 합산
        }
      }
    }

    // 결과 설정
    if (dataTotal[zone] !== undefined) {
      setDataFunction(dataTotal[zone]);
    } else {
      console.warn(`존재하지 않는 zone: ${zone}`);
    }
  };

  // 숫자 형식 변환
  const makeNumber = (param) => {
    return param ? param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  };

  useEffect(() => {
    // 데이터 처음 호출
    fetchData();

    // 15분마다 데이터 갱신
    const interval = setInterval(fetchData, 900000);

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(interval);
  }, [zone]);

  return (
    <StatusBlock className="container">
      <div className={zone === "전체" ? "fpa_box all" : "fpa_box section"} style={{ background: "linear-gradient(to bottom, #44A9FF, #4165E5)" }}>
        <div className="fpa_box_table">
          <div className="tr">
            <div className="td">
              <span className="fpa_title">현재 방문객</span>
              <br />
              <span className="fpa_num1">{makeNumber(todayVisitorTotal)} 명</span>
            </div>
            <div className="td">
              <span className="fpa_title">오늘 방문객</span>
              <br />
              <span className="fpa_num1">{makeNumber(mainStackVisitTotal)} 명</span>
            </div>
            <div className="td">
              <span className="fpa_title">이달의 방문객</span>
              <br />
              <span className="fpa_num1">{makeNumber(mainMonthlyVisitTotal)} 명</span>
            </div>
          </div>
        </div>
      </div>
    </StatusBlock>
  );
}

export default DashAreaInfo;
