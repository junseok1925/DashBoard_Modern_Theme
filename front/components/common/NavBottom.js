import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Button from "./Button";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  //background-color: rgba(0, 0, 0, 1);
  .sub_menu_box2 {
    margin: 0 22% 0 22%;
    padding: 10px 0 15px 0;
    background: linear-gradient(to left, #68d9bd, #75beff);
    border-radius: 5px 5px 0 0;
  }
  .b3_on {
    background: #7b8df8;
  }
  .b3_off {
    background: #9c9c9c;
  }
  .top_analysis_b3 {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: #e4e1e1;
    font-size: 13px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 2px 4px 0px 4px;
    border-radius: 5px;
    box-shadow: -5px -2px 5px -5px gray inset;
  }
  .dark {
    .sub_menu_box2 {
      background: #465275;
    }
    .b3_on {
      background: #d59866;
    }
    .b3_off {
      background: #926c4d;
    }
    .top_analysis_b3 {
      color: #e4e1e1;
      font-size: 13px;
      cursor: pointer;
    }
  }
  .sub_menu_box {
    background: rgba(0, 0, 0, 0);
  }
`;

// @param = value
// value is 1 = compare
// value is 2 = floatpopulation
// value is 3 = congest
// value is 4 = environmental
// value is 5 = report

function NavBottom({ value, theme }) {
  if (!value) {
    value = "1";
  }

  return (
    <Footer>
      <div className={theme === "dark" ? "darkback" : "lightback"}>
        {/* <!--서브메뉴--> */}
        <div className="sub_menu_box">
          <div className="sub_menu_box2">
            <Button nav className={value === "1" ? "top_analysis_b3 b3_on" : "top_analysis_b3 b3_off"} onClick={() => Router.push("/compare/compare")}>
              종합 분석
            </Button>
            <Button nav className={value === "2" ? "top_analysis_b3 b3_on" : "top_analysis_b3 b3_off"} onClick={() => Router.push("/compare/floatpopulation")}>
              유동인구 분석
            </Button>
            <Button nav className={value === "4" ? "top_analysis_b3 b3_on" : "top_analysis_b3 b3_off"} onClick={() => Router.push("/compare/congest")}>
              혼잡도 분석
            </Button>
            <Button nav className={value === "7" ? "top_analysis_b3 b3_on" : "top_analysis_b3 b3_off"} onClick={() => Router.push("/compare/environmental")}>
              환경정보 분석
            </Button>
            <Button nav className={value === "6" ? "top_analysis_b3 b3_on" : "top_analysis_b3 b3_off"} onClick={() => Router.push("/compare/report")}>
              분석 리포트
            </Button>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default NavBottom;
