import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import Responsive from "./Responsive";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Modal from "react-modal";

import {
  logoutRequestAction,
  CHANGE_PASSWORD_REQUEST,
} from "../../reducers/auth";
import { HeaderBlock, App, Wrapper, UserInfo } from "../styles/HeaderStyle";
import top_logo from "../../public/images/top_logo.png";
import header_logo from "../../public/images/headerlogo.png";
import wrapper from "../../store/configureStore";
import Menu from "./Menu";

const Header = () => {
  const dispatch = useDispatch();
  const { me, themedark } = useSelector((state) => state.auth);

  // if (!page) {
  //   value = '0';
  // }

  /**
   * 미로그인시 로그인 페이지로 이동
   */
  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  /**
   * 다크모드 변경
   */
  // useEffect (() => {
  //   const storage = window.sessionStorage;
  //   if (storage.getItem('theme')){
  //   }
  //   else {
  //   }

  //  });

  /**
   * 관리자페이지 버튼 설정, 관리자 버튼에서 관리자버튼 클릭시 이전페이지로 이동
   */

  // const adminOnclick = () =>{
  //   if (page === '0') {
  //     Router.push('/account');
  //   } else if (page === '1'){
  //     Router.back(); //이전페이지로
  //   }

  // }

  const onLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutRequestAction());
    window.location.reload();
  }, []);

  return (
    <HeaderBlock>
      <div className={me && me.theme === "dark" ? "darkblock" : "lightblock"}>
        <Wrapper>
          <Link href="/stoneDash" className="top_link">
            <Image
              src={header_logo}
              alt="123"
              width={180}
              height={100}
              className="top_logo"
            />
          </Link>
          <div to="/stoneDash" className="logo">
            경주 벚꽃 축제 유동인구 실시간 분석{" "}
          </div>
          <div className="right">
            {me ? me.username : ""} 님 &nbsp;&nbsp;
            <button className="logoutbtn" onClick={onLogout}>
              LOGOUT{" "}
            </button>
            <div className="menu">
              <Menu me={me} />
            </div>
          </div>
        </Wrapper>
      </div>
    </HeaderBlock>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
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
    }
);

export default Header;
