import React, { useCallback, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import Header from "../components/common/Header";
import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import wrapper from "../store/configureStore";

const Home = () => {
  const { me } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    } else if (me.section == 1) {
      Router.replace("/dash");
    } else if (me.section == 2) {
      Router.replace("/compare/stoneDensity");
    }
  }, [me && me.id]);

  return <div>lodaing...</div>;
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

export default Home;
