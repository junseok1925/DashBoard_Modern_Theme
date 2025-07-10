// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들
//api 불러와서 바로 적용
import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

//인디케이터 디자인
const StatusBlock = styled.div`
  font-family: "Pretendard", sans-serif;

  margin-top: 0px;
  margin-bottom: 7px;

  display: grid;

  .fpa_box {
    width: 98%;
    margin: 5px 1% 5px 1%;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .all {
    background: linear-gradient(to bottom, #44a9ff, #4165e5);
  }

  .section {
    background: rgba(117, 166, 252, 1);
  }

  .fpa_box_table {
    font-size: 16px;

    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 190%;
    margin: 10px 5px 10px 0;
  }
  .fpa_title {
    color: white;
  }
  .fpa_box_table .tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .td {
    border-right: solid 1px white;
  }
  .fpa_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .fpa_box_table .td:nth-child(3) {
    border-right: solid 0;
  }
  .fpa_num1 {
    font-weight: normal;
    color: white;
  }

  .fpa_box_dark {
    background-color: #3c496e;
    box-shadow: 0px 0px 0px #cccccc;
    border-radius: 7px;
  }

  .dark {
    .fpa_box_table {
      line-height: 170%;
    }
    .fpa_title {
      color: #f39700;
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
      font-weight: normal;
      color: white;
    }
  }
`;

function DashTotalInfo({ zone }) {
  // Redux 상태에서 사용자 정보 가져오기
  const { me } = useSelector((state) => state.auth);

  // 방문객 수 상태 초기화
  const [todayVisitorTotal, setTodayVisitorTotal] = useState("0");
  const [mainStackVisitTotal, setMainStackVisitTotal] = useState("0");
  const [mainMonthlyVisitTotal, setMainMonthlyVisitTotal] = useState("0");

  // API 데이터를 비동기로 가져오는 함수
  const fetchAPIData = async () => {
    try {
      // 세 개의 API 호출을 동시에 실행
      const [data1, data2, data3] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`), // 현재 전체 방문객
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`), //오늘 방문객
        axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountMonthly`), // 이달의 방문객
      ]);
      var timeTemp = "2020-01-01T00:00:00.000Z"; //최신데이터를 들고오기위해 임시저장
      // 각 API 응답에서 해당 구역 데이터 추출
      let zoneData1 = {};
      for (let i of data1.data) {
        if (i.zone === zone && i.time > timeTemp) {
          zoneData1 = i; // 가장 최근 데이터를 zoneData1에 저장
          timeTemp = i.time; // 해당 데이터의 time을 timeTemp로 업데이트
        }
      }
      let zoneData2 = {};
      var timeTemp = "2020-01-01T00:00:00.000Z"; //최신데이터를 들고오기위해 임시저장
      for (let i of data2.data) {
        if (i.zone === zone && i.time > timeTemp) {
          zoneData2 = i; // 가장 최근 데이터를 zoneData1에 저장
          timeTemp = i.time; // 해당 데이터의 time을 timeTemp로 업데이트
        }
      }
      let zoneData3 = {};
      var timeTemp = "2020-01-01T00:00:00.000Z"; //최신데이터를 들고오기위해 임시저장
      for (let i of data3.data) {
        if (i.zone === zone && i.time > timeTemp) {
          zoneData3 = i; // 가장 최근 데이터를 zoneData1에 저장
          timeTemp = i.time; // 해당 데이터의 time을 timeTemp로 업데이트
        }
      }

      // 현재 방문객 수 설정
      setTodayVisitorTotal(zoneData1.data || "0");

      // 오늘 방문객 수 설정, sessionStorage에서 가져올 수 있는 값 포함
      setMainStackVisitTotal(zoneData2.data || "0");

      // 이달의 방문객 수 설정
      setMainMonthlyVisitTotal(zoneData3.data || "0");

      // 오늘 누적 방문객 수가 있을 경우 sessionStorage에 저장
      // if (zoneData2.data) {
      //   sessionStorage.setItem("오늘 방문객", zoneData2.data);
      // }

      // // 이달의 방문객 수가 있을 경우 sessionStorage에 저장
      // if (zoneData3.data) {
      //   sessionStorage.setItem("이달의 방문객", zoneData3.data);
      // }
    } catch (err) {
      // 에러 발생 시 콘솔에 로그 출력
      console.error(err);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출 및 주기적 데이터 갱신
  useEffect(() => {
    fetchAPIData();
    const intervalId = setInterval(fetchAPIData, 100000); // 15분마다 데이터 갱신

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  // 숫자 포맷팅 함수
  const makeNumber = (param) => {
    return param ? param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  };

  return (
    <StatusBlock className="container">
      <div className={zone === "포항관광지 전체" ? "fpa_box all" : "fpa_box section"}>
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

export default DashTotalInfo;
