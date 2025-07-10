import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { REMOVE_ACCOUNT_REQUEST, CHANGE_ACCOUNT_REQUEST, CHANGE_SECTION_REQUEST } from "../../reducers/auth";
import { PUT_LOG_REQUEST } from "../../reducers/log";

const Account = ({ account }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.auth);
  // const [curDate, setCurDate] = useState('');
  //const [curTime, setCurTime] = useState('');

  //계정삭제
  const onRemoveAccount = useCallback((e) => {
    e.preventDefault();

    const context = me.userid + "에 의해 " + account.userid + "의 계정이 삭제";
    const field = "계정관리";

    dispatch({
      //로그기록
      type: PUT_LOG_REQUEST,
      data: { field, context },
    });

    dispatch({
      type: REMOVE_ACCOUNT_REQUEST,
      data: account.id,
    });
    alert(account.userid + "의 계정이 삭제되었습니다.");
    window.location.reload(); //페이지 새로고침
  }, []);

  //권한 수정
  const onChangeAccount = useCallback(
    (e) => {
      //0: 관리자 1:사용자 2:대기자
      e.preventDefault();
      const context = me.userid + "에 의해 " + account.userid + "의 계정권한 수정";
      const field = "계정관리";

      dispatch({
        //로그기록
        type: PUT_LOG_REQUEST,
        data: { field, context },
      });
      if (account.authority === 0) {
        dispatch({
          type: CHANGE_ACCOUNT_REQUEST,
          data: { authority: 1, id: account.id },
        });
        alert(account.userid + "의 권한이 사용자 권한으로 변경됐습니다.");
      } else if (account.authority === 1) {
        dispatch({
          type: CHANGE_ACCOUNT_REQUEST,
          data: { authority: 0, id: account.id },
        });
        alert(account.userid + "의 권한이 관리자 권한으로 변경됐습니다.");
      }

      window.location.reload();
    },
    [1, account.id]
  );
  // 대시보드 유형 변경
  const onChangeSection = useCallback(
    (e) => {
      e.preventDefault();
      const context = me.userid + "에 의해 " + account.userid + "의 대시보드 유형 수정";
      const field = "계정관리";

      dispatch({
        //로그기록
        type: PUT_LOG_REQUEST,
        data: { field, context },
      });
      if (account.section === "1") {
        dispatch({
          type: CHANGE_SECTION_REQUEST,
          data: { section: 2, id: account.id },
        });
        alert(account.userid + "의 대시보드 유형이 돌담길로 변경되었습니다.");
      } else if (account.section === "2") {
        dispatch({
          type: CHANGE_SECTION_REQUEST,
          data: { section: 1, id: account.id },
        });
        alert(account.userid + "의 대시보드 유형이 경주전체로 변경되었습니다.");
      }

      window.location.reload();
    },
    [1, account.id]
  );

  //승인요청
  const onApprove = useCallback(
    (e) => {
      //0: 관리자 1:사용자 2:대기자
      e.preventDefault();
      if (account.authority === 2) {
        const context = me.userid + "에 의해 " + account.userid + "의 사용자 승인완료";
        const field = "계정관리";

        dispatch({
          //로그기록
          type: PUT_LOG_REQUEST,
          data: { field, context },
        });

        dispatch({
          type: CHANGE_ACCOUNT_REQUEST,
          data: { authority: 1, id: account.id },
        });
        alert(me.userid + "에 의해 " + account.username + "의 사용자 승인이 완료 됐습니다.");
      }
      window.location.reload();
    },
    [1, account.id]
  );

  return (
    <tr className="tr">
      <td>{account.userid}</td>
      <td>{account.username}</td>
      <td>{account.userid === "admin" ? <div>admin</div> : account.authority === 2 ? <div>대기자</div> : account.authority === 0 ? "관리자" : "사용자"}</td>
      <td>
        {account.userid === "admin" ? (
          <div></div>
        ) : (
          <button className="button" onClick={onChangeAccount}>
            <b>수정</b>
          </button>
        )}
      </td>{" "}
      <td>
        {account.userid === "admin" ? (
          <div></div>
        ) : (
          <button className="button" onClick={onRemoveAccount}>
            <b>삭제</b>
          </button>
        )}
      </td>
      <td>
        {account.userid === "admin" ? (
          <div></div>
        ) : account.authority === 2 ? (
          <button className="button" onClick={onApprove}>
            <b>승인</b>
          </button>
        ) : (
          <div></div>
        )}
      </td>
    </tr>
  );
};

export default Account;
