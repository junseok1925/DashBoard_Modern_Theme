import React, { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import Router from "next/router";

import Account from "../components/account/Account";
import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import { LOAD_ACCOUNTS_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import wrapper from "../store/configureStore";

const AuthTableBlock = styled.div`
  position: absolute;
  left: 5%;
  top: 20%;
  width: 90%;
  height: 70%;
  text-align: center;
  //background: #3c496e;
  background: white;
  box-shadow: 0px 0px 5px #5f5f5f;
  border-radius: 0.2em;
  font-family: NanumSquareRoundR;
  border: 2px solid #ffffff;
  overflow: auto;

  .click {
    cursor: pointer;
  }
`;

const AuthBody = styled.div`

  height:100%
  width: 100%;
  text-align: center;
  
  table { 
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
  thead {
    border-bottom : 10px;
  }

  th{
    //color:white;
    color:black; 
    font-weight: blod; 
  }

  thead tr {
    line-height: 40px;
  }
  tbody tr{
    //color:white;
    color:black;
    line-height: 30px;
    border-top: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    
  }
  .darkuser{
    color:white;
    font-family: NanumSquareRoundR;
    font-size: 22pt;
    margin-top: 2%;
    
  }

  .lightuser{
    color:black;
    font-family: NanumSquareRoundR;
    font-size: 22pt;
    margin: 1% 0 1% 0;
    width: 100%;
    //background: white;
    font-weight: bold;
    //text-align: center;
  }

  .button {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: white;
    font-size: 15px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 5px 4px 5px 4px;
    border-radius: 5px;
    background: #7b8df8;
    height: 30px;

    &:hover {
      background: #e5e5e5;
      color:black;
    }
  }
`;

const AccountPage = () => {
  const dispatch = useDispatch();
  const { auths, me } = useSelector((state) => state.auth);
  const columns = ["이름", "아이디", "권한", "권한변경", "삭제", "승인요청"];

  useEffect(() => {
    if (me && me.authority !== 0) {
      // 사용자는 계정관리 페이지 들어갈시 대시보드 페이지로 이동
      Router.replace("/dash");
    }
  }, [me && me.authority]);

  useEffect(() => {
    dispatch({
      type: LOAD_ACCOUNTS_REQUEST,
    });
  }, []);
  return (
    <>
      <Head>
        <title>계정 관리</title>
      </Head>
      <AuthBody>
        <Header />
        <Nav value={"4"} />
        <AuthTableBlock>
          <div className="lightuser">사용자 목록</div>
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auths.map((account) => (
                <Account key={account.id} account={account} />
              ))}
            </tbody>
          </table>
        </AuthTableBlock>
      </AuthBody>
    </>
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
  store.dispatch({
    type: LOAD_ACCOUNTS_REQUEST,
  });
  store.dispatch(END);
  console.log("getServerSideProps end");
  await store.sagaTask.toPromise();
});

export default AccountPage;
