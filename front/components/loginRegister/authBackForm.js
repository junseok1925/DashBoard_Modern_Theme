import React from "react";
import styled from "styled-components";
import Image from "next/image";
import background_login from "../../public/images/background_login.jpg";

/**
 * 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.(배경)
 */

/* 화면 전체를 채움 */
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .logo {
    position: relative;
    width: 80px;
  }
  position: relative;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 2px;
`;

// children 은 AuthTemplate 컴포넌트 사이에 AuthTable 컴포넌트가 있는데 AuthTable의 페이지를 보여주려고 할 때 사용한다. -> page/LoginPage확인
const AuthBackForm = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <Image className="background" src={background_login} layout="fill" alt="background" />
      <WhiteBox>
        <div className="logo-area">{children}</div>
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthBackForm;
