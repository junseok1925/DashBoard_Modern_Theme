import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Router from "next/router";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/auth";
import useInput from "../../hooks/useInput";
import Button from "../common/Button";
import top_logo from "../../public/images/top_logo.png";
import { LOG_IN_REQUEST } from "../../reducers/auth";
import wrapper from "../../store/configureStore";

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  font-family: "Pretendard";
  font-weight: 600;

  p {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
    margin-top: 0.7rem;
    font-size: 27pt;
    font-weight: 900;
  }

  .pw {
    width: 400px;
    font-weight: 600;
    &::placeholder {
      color: #a8b3ca; /* placeholder 색상 변경 */
    }
  }
  .id {
    margin-top: 45px;
    width: 400px;
    font-weight: 600;
    &::placeholder {
      color: #a8b3ca; /* placeholder 색상 변경 */
    }
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #a8b3ca;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 3rem;
  text-align: right;
  a {
    color: #a8b3ca;
    text-decoration: underline;
    &:hover {
      color: gray;
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  margin-top: 1rem;
  margin-bottom: -2rem;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const LoginForm = ({ section }) => {
  const dispatch = useDispatch();
  const { me, logInError } = useSelector((state) => state.auth); // loginDone 변경될시 페이지가 알아서 리 렌더링됨
  const [userid, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: LOG_IN_REQUEST,
        data: { userid, password, section },
      });
    },
    [userid, password]
  );

  return (
    <>
      <AuthFormBlock>
        <div>
          <Image className="logo" src={top_logo} />
        </div>
        <form onSubmit={onSubmitForm}>
          <StyledInput className="id" autoComplete="username" name="username" onChange={onChangeId} placeholder=" 아이디" />
          <StyledInput className="pw" autoComplete="new-password" name="password" onChange={onChangePassword} placeholder=" 비밀번호 " type="password" />
          {logInError && <ErrorMessage>{logInError}</ErrorMessage>}
          <ButtonWithMarginTop loginpage fullWidth style={{ marginTop: "3rem" }}>
            로그인
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link href="/register">사용자 등록</Link>
        </Footer>
      </AuthFormBlock>
      {/* <button onClick={onSubmitForm}>test</button> */}
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
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default LoginForm;
