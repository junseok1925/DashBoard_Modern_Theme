import React from "react";
import styled from "styled-components";

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
  background: linear-gradient(to top, #ffffff, #c0e8ff, #59c8ff); /* 그라데이션 추가 */
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
    width: 100px;
  }
  position: relative;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 480px;
  height: 520px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
`;

// children 은 AuthTemplate 컴포넌트 사이에 AuthTable 컴포넌트가 있는데 AuthTable의 페이지를 보여주려고 할 때 사용한다. -> page/LoginPage확인
const AuthBackForm = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">{children}</div>
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthBackForm;
