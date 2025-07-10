import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import useInput from "../../hooks/useInput";
import Button from "../common/Button";
import top_logo from "../../public/images/top_logo.png";
import { SIGN_UP_REQUEST } from "../../reducers/auth";

// 한,영타 변환 라이브러리
const { Inko } = require("inko");
const inko = new Inko();

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  font-family: "Pretendard";
  p {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
    margin-top: 0.7rem;
    font-size: 27pt;
    font-weight: 900;
    font-family: "NanumSquareRoundEB";
  }
  .logo {
    width: 270px;
    margin-bottom: 50px;
  }
  .pw {
    width: 400px;
    font-weight: 600;
    &::placeholder {
      color: #a8b3ca; /* placeholder 색상 변경 */
    }
  }
  .id,
  .name {
    width: 400px;
    &::placeholder {
      color: #a8b3ca; /* placeholder 색상 변경 */
    }
  }
  .form-control2 {
    margin-top: 12px;
    width: 100px;
    height: 30px;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid gray;
  }
  .sectionText {
    font-size: 12pt;
    color: rgba(0, 0, 0, 0.6);
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-family: "Pretendard";
  font-weight: 600;

  font-size: 0.9rem;
  border: none;
  background: rgba(255, 255, 255, 0.8);
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
  margin-top: 2rem;
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
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { signUpDone, signUpLoading, signUpError } = useSelector((state) => state.auth);
  const [userid, onChangeId] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [error, setError] = useState(null);
  // const [selectField, setSelectField] = useState("전체"); // 더 이상 사용하지 않으므로 삭제해도 됨

  useEffect(() => {
    if (signUpDone) {
      setError("사용자등록이 완료됐습니다.");
      Router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      //alert(signUpError);
    }
  }, [signUpError]);

  const authority = 2; //회원가입시 무조건 대기자로 가입됨 0:관리자 1:사용자 2:대기자

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      let password1RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 비밀번호 조건

      // 부서 선택이 없으므로 section 관련 코드는 삭제
      // const section = "4";  //부서 선택을 없애므로 여기서 기본값을 설정해도 되지만, section은 더 이상 사용하지 않음

      // 한글 아이디를 타자영어로 변환 참고사이트(https://github.com/738/inko?tab=readme-ov-file)
      // const ko2enId = inko.ko2en(userid);

      if (!password) {
        setError("비밀번호를 입력해주세요");
      } else if (!password1RegExp.test(password)) {
        //비밀번호 조건에 맞지 않을 시
        setError("비밀번호는 최소 하나의 문자, 숫자, 특수문자 포함. 8자리 이상으로 입력하세요");
        // } else if (password.includes(ko2enId)) {
        //   setError("아이디가 포함된 비밀번호를 등록이 불가합니다.");
      } else if (password === passwordConfirm) {
        // 비밀번호와 비밀번호 확인이 동일한지 확인
        dispatch({
          type: SIGN_UP_REQUEST,
          data: { userid, username, password, authority },
        });

        return 0;
      }
      //새비번과 새비번확인이 다를시
      else if (password !== passwordConfirm) {
        setError("비밀번호가 다릅니다.");
      }
      //onChangePassword('');//새비밀번호 적는 곳 초기화
      //onChangePasswordConfirm('');// 비밀번호 확인 적는 곳 초기화

      // dispatch({
      //   type: SIGN_UP_REQUEST,
      //   data: { userid, username, password, authority },
      // });
      // console.log(signUpDone, 'dddqwer');
      //window.location.reload();
    },
    [userid, username, password, passwordConfirm]
  );

  return (
    <>
      <AuthFormBlock>
        <div>
          <Image className="logo" src={top_logo} />
        </div>
        <form onSubmit={onSubmitForm}>
          <StyledInput className="id" autoComplete="username" name="username" onChange={onChangeId} value={userid} placeholder=" 아이디" />
          <StyledInput className="name" autoComplete="name" name="name" onChange={onChangeUsername} value={username} placeholder=" 이름" />
          <StyledInput
            className="pw"
            autoComplete="new-password"
            name="password"
            onChange={onChangePassword}
            value={password}
            placeholder=" 비밀번호(영문,특수문자,숫자 포함 8자 이상) "
            type="password"
          />
          <StyledInput className="pw" autoComplete="new-password" name="passwordConfirm" onChange={onChangePasswordConfirm} value={passwordConfirm} placeholder=" 비밀번호 확인" type="password" />
          {/* 부서 선택 부분 제거 */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWithMarginTop loginpage fullWidth style={{ marginTop: "1rem" }} loading={signUpLoading}>
            사용자 등록
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link href="/login">로그인</Link>
        </Footer>
      </AuthFormBlock>
    </>
  );
};

export default RegisterForm;
