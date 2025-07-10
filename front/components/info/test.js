// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들
//api 불러와서 바로 적용
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//인디케이터 디자인
const StatusBlock = styled.div`
  //display: grid;
  //grid-template-columns: 2fr 1fr;
  //margin: 0 5px 5px 0;
  //  height: 130px;

  .fpa_box {
    width: 98%;
    margin: 5px 1% 5px 1%;
    //height: 130px;
    background-color: #75a6fc;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .fpa_box_table {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 190%;
    margin: 10px 5px 10px 0;
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
  .fpa_box_table .td:nth-child(6) {
    border-right: solid 0;
  }
  .fpa_num1 {
    font-size: 20px;
    font-weight: normal;
    color: white;
  }

  .dark.fpa_box {
    background-color: #3c496e;
    box-shadow: 0px 0px 0px #cccccc;
  }

  .dark {
    .fpa_box_table {
      line-height: 170%;
    }
    .fpa_title {
      font-size: 15px;
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
`;

function test() {
  const makeNumber = (param) => {
    return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <StatusBlock className="fpa_box">
      <div className="fpa_box_table">
        <div className="tr">
          <div className="td">
            <span className="fpa_title">오늘 방문객</span>
          </div>
          <div className="td">
            <span className="fpa_title">이달의 방문객</span>
          </div>
          <div className="td">
            <span className="fpa_title">누적 방문객</span>
          </div>
        </div>
      </div>
    </StatusBlock>
  );
}

export default test;
