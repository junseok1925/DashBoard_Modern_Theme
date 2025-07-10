// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들
//api 불러와서 바로 적용
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

//인디케이터 디자인
const StatusBlock = styled.div`
  margin-top: 0px;
  margin-bottom: 15px;

  display: grid;

  .fpa_box {
    width: 98%;
    //margin: 5px 1% 5px 1%;
    //border-radius: 7px;
    //box-shadow: 0px 0px 5px #cccccc;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    padding: 5px;
  }

  .all {
    background: linear-gradient(to right, #68d9bd, #75beff);
  }

  .section {
    background: rgba(117, 166, 252, 1);
  }

  .fpa_box_table {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 190%;
    //margin: 10px 5px 10px 0;
  }
  .fpa_title {
    font-size: 20px;
    color: white;
    font-weight: bold;
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
    font-size: 19px;
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
      font-size: 20px;
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
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
`;

function DashAreaInfo({ theme, zone }) {
  const { me } = useSelector((state) => state.auth);
  const [todayVisitorTotal, setTodayVisitorTotal] = useState("0"); // 오늘자 방문객
  const [mainStackVisitTotal, setMainStackVisitTotal] = useState("0"); // 누적방문객
  const [mainMonthlyVisitTotal, setMainMonthlyVisitTotal] = useState("0"); // 이달의 방문객

  const getAPIdata1 = async () => {
    //console.log("getAPIdata")

    // 현재 전체방문객
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=10m`);

      var tempTime = "2021-04-24T10:50:00.000Z";

      //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);
      //console.log(response3.data);

      for (let i of response.data) {
        if (i.zone_id === zone) {
          if (i.time >= tempTime) {
            setTodayVisitorTotal(i.data);
            tempTime = i.time;
          }
        }
      }
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        getAPIdata1();
      }, 2000);
    }
  };
  const getAPIdata2 = async () => {
    // 오늘 누적방문객
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountHourly?unit=1d-1h`);

      //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
      var tempTime = "2021-04-24T10:50:00.000Z";

      var cnt = 0;
      for (let i of response.data) {
        if (i.zone_id === zone) {
          if (i.time >= tempTime) {
            setMainStackVisitTotal(i.data);
            //console.log(i.data);
            tempTime = i.time;
            //sessionStorage.setItem("2078", i.data);
            //console.log(sessionStorage.getItem('2078'));
            cnt = 1;
          }
        } //console.log(i.zone);
      }
      //console.log('현재방문객추이',response.data);
      //if (cnt == 0 && sessionStorage.getItem("2078")) {
      //  setMainStackVisitTotal(sessionStorage.getItem("2078"));
      //}
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        getAPIdata2();
      }, 2000);
    }
  };

  const getAPIdata3 = async () => {
    // 이달의 방문객
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceCountMonthly`);

      //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
      //console.log(response3.data);

      for (let i of response.data) {
        if (i.zone === zone) {
          if (i.data != 0) {
            setMainMonthlyVisitTotal(i.data);
          }
        }
      }
      //console.log('현재방문객추이',todayVisitorTotal);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        getAPIdata3();
      }, 2000);
    }
  };

  useEffect(() => {
    getAPIdata1();
    getAPIdata2();
    getAPIdata3();
    // 30분마다 새로 고침 하여 데이터를 신규로 받아옴.
    // 30분 = 1800초 * 100 하여 밀리세컨단위로 변환 1800000
    setInterval(getAPIdata1, 900000);
    setInterval(getAPIdata2, 900000);
    setInterval(getAPIdata3, 900000);
  }, []);

  const makeNumber = (param) => {
    if (param) {
      return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  };

  return (
    <StatusBlock className="container">
      <div className={zone === "전체" ? "fpa_box all" : "fpa_box section"}>
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
