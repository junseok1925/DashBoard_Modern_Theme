import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Head from "next/head";

import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import Status from "../../components/info/Status";
import NavBottom from "../../components/common/NavBottom";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

const Background = styled.div`
  background-color: #f6f9fe;

  .darkback {
    background-color: #1b2137;
  }
  .iframeBox {
    width: 100%;
    height: 790px;
  }
  .iframe {
    width: 100%;
    height: 100%;
  }
`;

const Congest = () => {
  const { me } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    }
  }, [me && me.id]);

  return (
    <Background>
      <div className={me && me.theme === "dark" ? "darkback" : "lightback"}>
        <Header page={"0"} />
        <Nav value={"3"} bottomValue={"4"} />
        <div className="iframeBox">
          <iframe className="iframe" src="../../heatmap.html" />
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
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Congest;
