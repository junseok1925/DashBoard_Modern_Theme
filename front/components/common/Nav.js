// 대시보드 , 통합분석, 비교분석 네비게이션바

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Router from "next/router";

import { CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS } from "../../reducers/auth";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";

import { Block, Topnavmenu } from "../styles/NavsStyle";

// @param = value
// value is 1 = dashboard
// value is 2 = analysis
// value is 3 = compare

function Nav({ value, bottomValue }) {
  const dispatch = useDispatch();
  const [curTime, setCurTime] = useState("");
  const [darktheme, setDarktheme] = useState(false);
  const { me } = useSelector((state) => state.auth);

  setTimeout(() => {
    //시간설정
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    const seconds = ("0" + today.getSeconds()).slice(-2);

    const dateString = year + "년 " + month + "월 " + day + "일 " + hours + ":" + minutes + ":" + seconds;

    setCurTime(dateString);
  }, 1000);

  if (!value) {
    value = "1";
  }

  /**
   * globalstyle 변경
   */

  useEffect(() => {
    var body = document.querySelector("body");
    const storage = window.sessionStorage;
    //console.log ('storage1',storage.getItem('theme'))

    if (me && me.theme === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [me && me.theme]);

  /**
   * 테마변경 스위치 함수
   */

  const changeThemeHandler = () => {
    const darkmode = "dark";
    const lightmode = "light";

    if (me.theme === "dark") {
      dispatch({
        type: CHANGE_THEME_REQUEST,
        data: { id: me.id, theme: lightmode },
      });
      //console.log('dark');
    } else {
      dispatch({
        type: CHANGE_THEME_REQUEST,
        data: { id: me.id, theme: darkmode },
      });
      // console.log('light');
    }
    window.location.reload(); //페이지 새로고침
  };

  return (
    <Block>
      <div className={value === "3" ? "lightblock high" : "lightblock"}>
        <Topnavmenu>
          <div className="lightnav">
            <button type="button" className={value === "1" ? "top_menu_b top_menu_b_on" : "top_menu_b top_menu_b_off"} onClick={() => Router.push("/dash")}>
              대시 보드
            </button>
            <button type="button" className={value === "2" ? "top_menu_b top_menu_b_on" : "top_menu_b top_menu_b_off"} onClick={() => Router.push("/analysis")}>
              통합 분석
            </button>
            <button type="button" className={value === "3" ? "top_menu_b top_menu_b_on" : "top_menu_b top_menu_b_off"} onClick={() => Router.push("/compare/compare")}>
              비교 분석
            </button>
          </div>
          {value === "3" ? (
            <div className="sub_menu_box2">
              <button nav className={bottomValue === "1" ? "top_analysis_b3 button_on" : "top_analysis_b3 button_off"} onClick={() => Router.push("/compare/compare")}>
                종합 분석
              </button>
              <button nav className={bottomValue === "2" ? "top_analysis_b3 button_on" : "top_analysis_b3 button_off"} onClick={() => Router.push("/compare/floatpopulation")}>
                유동인구 분석
              </button>
              <button nav className={bottomValue === "4" ? "top_analysis_b3 button_on" : "top_analysis_b3 button_off"} onClick={() => Router.push("/compare/congest")}>
                혼잡도 분석
              </button>
              <button nav className={bottomValue === "7" ? "top_analysis_b3 button_on" : "top_analysis_b3 button_off"} onClick={() => Router.push("/compare/density")}>
                밀집도 분석
              </button>
              <button nav className={bottomValue === "6" ? "top_analysis_b3 button_on" : "top_analysis_b3 button_off"} onClick={() => Router.push("/compare/report")}>
                분석 리포트
              </button>
            </div>
          ) : (
            ""
          )}
        </Topnavmenu>
        {/* <span className='curtime'>{curTime}</span> */}
        {/* <div className={'toggleBG btn-toggle'} onClick={changeThemeHandler}>
                    <button className='toggleFG'></button>
                </div>
                 */}
      </div>
    </Block>
  );
}

export default Nav;
