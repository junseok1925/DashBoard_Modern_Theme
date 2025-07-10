import styled, { createGlobalStyle } from "styled-components";
import Responsive from "../common/Responsive";

/**
 * 맨 위의 헤더
 */

export const HeaderBlock = styled.div`
  font-family: "Pretendard", sans-serif;

  width: 100%;
  height: 3.8rem;
  color: white;
  .iframe {
    width: 100%;
    height: 100%;
  }
  .lightblock {
    // background: linear-gradient(to left,rgb(59, 107, 95), black);
    background: #22222e;
/    //border-bottom: solid 10px gray;
  }
  .darkblock {
    background: #3c496e;
  }
  .logoutbtn {
    border-radius: 7px;    
    border: 0;
    background: rgb(255, 255, 255);
    box-shadow: 0px 4px 8px rgba(50, 50, 50, 0.5);
    margin: 5px;
    display: inline-block;
    color: #21212e;
    font-size: 16px;
    font-weight: 600;
    padding: 4px;
    width: 100px;
    height: 30px;
    text-align: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #333344; /* 검은색 배경 */
      border: 1px solid #ffffff; /* 하얀색 테두리 */
      color: #ffffff; /* 글자색 흰색으로 변경 */
    }
  }

  }
  .darkblock .logoutbtn {
    background: #242d4c;
  }

  .menu {
    height: 40px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

//모달창
export const App2 = styled.div`
  font-family: "Pretendard", sans-serif;

  background: white;

  .modals {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 999;
    width: 500px;
    height: 300px;
    border-radius: 5px;
    text-align: center;
    color: black;
    box-shadow: 0 0 10px gray;
  }
  .title {
    margin-top: 17px;
    font-size: 23px;
  }
  .strokeLine {
    border: 1px solid #89898f; /* 원하는 색상 설정 */
  }
  .password {
    margin-top: 17px;
    margin-bottom: 5px;
    border-width: 0px 0px 1px 0px;
    border-bottom: 1px solid #89898f;
    width: 300px;
  }
  .button {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: white;
    font-size: 17px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 5px 4px 5px 4px;
    border-radius: 5px;
    background: #4165e5;
    height: 40px;
    width: 120px;

    &:hover {
      background: #0a4770;
    }
  }

  .buttonC {
    text-transform: uppercase;
    border: 0.5px solid #89898f;
    text-align: center;
    color: black;
    font-size: 17px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 5px 4px 5px 4px;
    border-radius: 5px;
    background: #f6f5fd;
    height: 40px;
    width: 120px;

    &:hover {
      background: #cbcbcb;
      color: white;
      border: none;
    }
  }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
export const Wrapper = styled(Responsive)`
  height: 3.8rem;
  width: 100%;
  display: flex;
  //align-items: stretch;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  padding-left: 0;
  padding-right: 0;
  background: rgba(0, 0, 0, 0);

  .logo {
    font-size: 28px;
    font-weight: 500;
    margin: 3px 0 0 80px;
    float: left;
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 0px;
    font-size: 24px;
  }
  .admin {
    width: 30px;
    heigth: 30px;
    margin-top: 5px;
    cursor: pointer;
  }
  .key {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .top_logo {
    margin-top: 0.1rem;
    width: 100%;
    // background: #ffffff;
  }
  .top_link {
    margin-left: 1rem;
    width: 10rem;
    heigth: 4rem;
    //background: #ffffff;
  }

  .logout {
    margin-top: 0;
  }
`;

export const UserInfo = styled.div`
  font-weight: 1000;
  font-size: 20pt;
  margin-right: 1rem;
  margin-top: 0px;
`;
