import React from "react";
import styled from "styled-components";

const BoxViewEnv = styled.div`
  width: 95%;
  margin: 10px 5% 10px 5%;
  //float: left;
  border-radius: 5px;
  text-align: center;

  .box_title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #fafbf6;
    text-shadow: -1px 0px #313131, 0px 1px #313131, 1px 0px #313131, 0px -1px #313131;
    font-weight: bolder;
    padding: 5px 0 5px 0;
    border-radius: 5px 5px 0 0;
  }

  .box_title_env {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #fafbf6;
    text-shadow: 0px 0px 5px black;

    padding: 5px 0 5px 0;
    border-radius: 5px 5px 0 0;
    background-color: white;
  }

  .box_content_env {
    background-color: white;
    padding: 0 0 10px 0;
    border-radius: 0 0 5px 5px;
  }

  .box_content_table_env {
    width: 100%;
    border: 0;
    cellpadding: 0;
    cellspacing: 0;
    padding: 7px 0 0 5px;
    font-size: 15px;
    line-height: 21px;
    font-weight: bold;
    color: black;
  }

  .title_bg1 {
    //background-color: #F7CDAF;
    //background: linear-gradient(to right, #68d9bd, #75beff);
    background: rgba(114, 197, 238, 0.7);
  }
  .title_bg2 {
    background-color: #ffdd85;
  }
  .title_bg3 {
    background-color: #bae575;
  }
  .title_bg4 {
    background-color: #9793b5;
  }
  .title_bg5 {
    background-color: #94bb9d;
  }
  .tr {
    display: grid;
    grid-template-columns: 1.3fr 1.3fr 2fr 2fr 1.6fr;
  }
  .box_content_title_env {
    color: #f39700;
    font-size: 14px;
  }

  .light {
    box-shadow: 0px 0px 5px #cccccc;
  }
  .dark {
    box-shadow: 0px 0px 0px #cccccc;

    .box_title_env {
      font-size: 18px;
      color: #fafbf6;
      text-shadow: 0px 0px 5px black;
      font-weight: bolder;
      background-color: #3c496e;
    }

    .box_content_env {
      background-color: #354060;
    }

    .box_content_table_env {
      font-size: 15px;
      color: white;
      font-weight: normal;
    }
  }
`;

function EnvInfo({ zoneName, zoneInfo, zoneIndex, theme }) {
  const makeNumber = (param) => {
    return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let titleCss = "title_bg1";
  switch (zoneIndex) {
    case "1":
      titleCss = "title_bg1";
      break;
    case "2":
      titleCss = "title_bg2";
      break;
    case "3":
      titleCss = "title_bg3";
      break;
    case "4":
      titleCss = "title_bg4";
      break;
    case "5":
      titleCss = "title_bg5";
      break;
    default:
      break;
  }

  return (
    <BoxViewEnv>
      <div className={theme === "dark" ? "dark" : "light"}>
        <div className={"box_title " + titleCss}>{zoneName}</div>
        <div className="box_content_env">
          <div className="box_content_table_env">
            <div className="tr">
              <div className="td">
                <span className="box_content_title_env">온도</span>
                <br />
                {makeNumber(zoneInfo[0])} ℃
              </div>
              <div className="td">
                <span className="box_content_title_env">습도</span>
                <br />
                {makeNumber(zoneInfo[1])} %
              </div>
              <div className="td">
                <span className="box_content_title_env">미세먼지</span>
                <br />
                {makeNumber(zoneInfo[2])} ㎍/㎥
              </div>
              <div className="td">
                <span className="box_content_title_env">초미세먼지</span>
                <br />
                {makeNumber(zoneInfo[3])} ㎍/㎥
              </div>
              <div className="td">
                <span className="box_content_title_env">TVOC</span>
                <br />
                {makeNumber(zoneInfo[4])} ppb
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxViewEnv>
  );
}

export default EnvInfo;
