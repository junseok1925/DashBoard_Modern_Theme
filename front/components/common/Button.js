/**
 * 버튼디자인 컴포넌트
 */

import React from "react";
import styled, { css } from "styled-components";

const buttonStyle = css`
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: gray;
  &:hover {
    background: gray;
  }

  ${(props) =>
    props.fullWidth && //버튼 기본으로 만든거 말고 다른 디자인의 버튼을 사용하고 싶을시
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: #0062aa;
      &:hover {
        background: #306080;
      }
    `}
   //로그인 버튼
  ${(props) =>
    props.loginpage &&
    css`
      background: #3366ff;
      &:hover {
        background: #3366ff;
      }
    `}

  ${(props) =>
    props.login &&
    css`
      background: #242d4c;
      width: 150px;
      height: 40px;
      font-size: 15pt;
      font-weight: normal;
      &:hover {
        background: #d59866;
      }
    `}

    ${(props) =>
    props.nav &&
    css`
      background: #242d4c;
      width: 140px;
      height: 30px;
      font-size: 12pt;
      font-weight: lighter;
      box-shadow: -5px -2px 5px -5px black inset;
      &:hover {
        background: #d59866;
      }
    `}

  ${(props) =>
    props.white &&
    css`
      border: solid;
      border-color: gray;
      color: gray;
      background: #ffffff;
      &:hover {
        background: #c5c5c5;
      }
    `}

    ${(props) =>
    props.black &&
    css`
      border: solid;
      border-color: gray;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyledLink {...props} cyan={props.cyan ? 1 : 0} /> : <StyledButton {...props} />;
};

export default Button;
