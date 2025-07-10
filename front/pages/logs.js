import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import axios from "axios";
import { END } from "redux-saga";

import { LOAD_MY_INFO_REQUEST } from "../reducers/auth";
import { LOAD_LOGLISTS_REQUEST } from "../reducers/log";
import wrapper from "../store/configureStore";
import Header from "../components/common/Header";
import Nav from "../components/common/Nav";

const Block = styled.div`
  height:100%
  width: 100%;
  text-align: center;

  font-family: "Pretendard", sans-serif;

  color: white; /* 텍스트 색상을 흰색으로 설정 */

  input[type="date"], select {
    background-color: #2c2c2c; /* 어두운 배경 */
    color: white; /* 입력값 색상 */
    border: 1px solid #555;
    padding: 5px;
    border-radius: 5px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1); /* 달력 아이콘 색상 변경 */
  }
  
  table { 
    margin: 10px 2.5% 10px; 2.5%  ;
    width: 95%;
    text-align: center;
    border-radius: 7px;
  }
  thead {
    border-bottom : 10px;
    font-weight: 600;
  }

  th{
    color:white; 
    font-weight: normal; 
    border-top: solid 1px #ccc;
  }

  thead tr {
    line-height: 40px;
  }

  thead th {
    font-weight: bold;
    border-bottom: solid 2px #ccc;
    text-align: left;
  }

  tbody tr{
    color:black;
    line-height: 30px;
    text-align: left;

    
  }
  .darkuser{
    color:white;
    font-size: 22pt;
    margin-top: 2%;
    
  }

  .lightuser{
    color:white;
    font-size: 22pt;
    margin: 1% 0 1% 0;
    width: 100%;
    //background: white;
    font-weight: bold;
    //text-align: center;
  }

  .block {
  position: absolute;
  left: 5%;
  top: 20%;
  width: 90%;
  height: 70%;
  text-align: center;
  background: #2d2d42;
  box-shadow: 0px 0px 5px #5F5F5F;
  border-radius: 0.2em;
  border: 2px solid #606E8E;
  overflow:auto;
  text-align: center;
  
  .click{
    cursor: pointer;
  }
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
    background: #4165E5;
    height: 30px;
    font-weight: bold;

    &:hover {
      background: #399AFF;
      color:white;
    }
  }

`;

const Logs = () => {
  const dispatch = useDispatch();
  const { me, ago7day, today } = useSelector((state) => state.auth);
  const [sttdate, setSttdate] = useState(ago7day);
  const [enddate, setEnddate] = useState(today);
  const [selectField, setSelectField] = useState("전체");
  const { logs } = useSelector((state) => state.log);
  const columns = ["분류", "내용", "시간"];
  let selectList = ["전체", "로그인", "계정관리"];

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/login");
    } else if (me.authority !== 0) {
      Router.replace("/dash");
    }
  }, [me && me.id]);

  //console.log('logs',logs);

  useEffect(() => {
    const field = selectField;
    dispatch({
      type: LOAD_LOGLISTS_REQUEST,
      data: { sttdate, enddate, field },
    });
  }, []);

  const searchHandler = () => {
    const field = selectField;
    dispatch({
      type: LOAD_LOGLISTS_REQUEST,
      data: { sttdate, enddate, field },
    });
  };

  const onClickField = useCallback((e) => {
    setSelectField(e.target.value);
  });

  return (
    <>
      <Head>
        <title>로그기록</title>
      </Head>
      <Block>
        <Header />
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
          <Nav value={"4"} />

          <div className="block">
            <div className="lightuser">로그 목록</div>
            날짜 선택&nbsp;
            <input type="date" id="currentDate" value={sttdate} onChange={(e) => setSttdate(e.target.value)} />
            &nbsp;&nbsp;~&nbsp;&nbsp;
            <input type="date" id="currentDate2" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
            &nbsp; &nbsp;&nbsp;&nbsp;분류선택&nbsp;&nbsp;
            <select className="form-control2" onChange={onClickField} value={selectField}>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            &nbsp;&nbsp;&nbsp;
            <button type="button " className="button" onClick={searchHandler}>
              검 색
            </button>
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>&nbsp;{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr>
                    {" "}
                    <th>&nbsp;{log.field}</th> <th>&nbsp;{log.context}</th>{" "}
                    <th>
                      &nbsp;{log.date}&nbsp;{log.time}
                    </th>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Block>
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
    type: LOAD_LOGLISTS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Logs;
