// 비교분석 사이트별 대시보드 폼
import React from "react";
import styled from "styled-components";

const BoxBlock = styled.div`
  text-align: center;
  margin: 0 0 10px 10px;
  .box_view_compare {
    width: 32%;
    margin: 0px 0.6% 15px 0.6%;
    padding: 0;
    float: left;
    border-radius: 5px;
    box-shadow: 0px 0px 0px #cccccc;
  }
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
  .box_content {
    padding: 0 0 10px 0;
    border-radius: 0 0 5px 5px;
    background-color: white;
    color: black;
    font-weight: normal;
  }

  .box_content_table {
    font-size: 20px;
    line-height: 30px;
    //line-height: 21px; //환경정보 있을시
  }

  .box_content_title {
    color: #f39700;
    font-size: 14px;
  }

  .light {
    box-shadow: 0px 0px 5px #cccccc;
  }

  .dark {
    box-shadow: 0px 0px 0px #cccccc;
    .box_content {
      background-color: #354060;
      color: #ffffff;
      font-weight: lighter;
    }
    .title_bg_gray {
      background-color: #464646;
      /*----*/
    }
  }

  .title_bg1 {
    //background-color: #fff788;
    background-color: #ffdd85;
  }
  .title_bg2 {
    //background-color: #ffdf8c;
    background-color: #ffcc4b;
  }
  .title_bg3 {
    background-color: #fdaa62;
  }
  .title_bg4 {
    //background-color: #99bba1;
    background-color: #bae575;
  }
  .title_bg5 {
    //background-color: #5E9C8C;
    background-color: #7ecd71;
  }
  .title_bg6 {
    background-color: #54c341;
  }
  .title_bg7 {
    background: rgba(114, 197, 238, 0.7);
  }
  .title_bg8 {
    //background-color: #03A9F4;
    background-color: #78b3f4;

    /*--용현면--*/
  }
  .title_bg9 {
    background-color: #0082ee;
    /*--사남면--*/
  }
  .title_bg10 {
    background-color: #a6c9f2;
  }
  .title_bg11 {
    background-color: #93a4e1;
  }
  .title_bg12 {
    background-color: #7c8fd5;
  }
  .title_bg13 {
    background-color: #ffb7e6;
  }
  .title_bg14 {
    background-color: #c29aea;
  }

  .title_bg15 {
    background-color: #806dbc;
  }
  .title_bg16 {
    background-color: #f5d1b7;
  }
  .title_bg17 {
    background-color: #fdafad;
  }

  .title_bg_gray {
    background-color: #e5e5e5;
    /*----*/
  }

  .tr {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    margin-bottom: 10px;
  }
  .tr2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .first {
    padding-top: 5px;
  }
`;

function ZoneInfo({ zoneName, zoneInfo, zoneIndex, theme }) {
  const makeNumber = (param) => {
    return param?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //인포 제목 배경색
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
    case "6":
      titleCss = "title_bg6";
      break;
    case "7":
      titleCss = "title_bg7";
      break;
    case "8":
      titleCss = "title_bg8";
      break;
    case "9":
      titleCss = "title_bg9";
      break;
    case "10":
      titleCss = "title_bg10";
      break;
    case "11":
      titleCss = "title_bg11";
      break;
    case "12":
      titleCss = "title_bg12";
      break;
    case "13":
      titleCss = "title_bg13";
      break;
    case "14":
      titleCss = "title_bg14";
      break;
    case "15":
      titleCss = "title_bg15";
      break;
    case "16":
      titleCss = "title_bg16";
      break;
    case "17":
      titleCss = "title_bg17";
      break;
    case "18":
      titleCss = "title_bg_gray";
      break;
    default:
      break;
  }

  if (zoneInfo === undefined) {
    return <></>;
  } else {
    return (
      <BoxBlock className="box_view_compare">
        <div className={theme === "dark" ? "dark" : "light"}>
          <div className={"box_title " + titleCss}>{zoneName}</div>

          {/* <!--분석내용-->  */}

          <div className="box_content">
            <div className="box_content_table">
              <div className="tr first">
                <div className="td ">
                  <span className="box_content_title">오늘 방문자</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[0]) + "명" : "-"}
                </div>
                <div className="td">
                  <span className="box_content_title">이달 방문자</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[1]) + "명" : "-"}
                </div>
                <div className="td">
                  <span className="box_content_title">금년 누적 방문자</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[2]) + "명" : "-"}
                </div>
              </div>
              <div className="tr">
                <div className="td">
                  <span className="box_content_title">체류인원</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[3]) + "명" : "-"} <br />
                </div>
                <div className="td">
                  <span className="box_content_title">체류시간</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[4]) + "분" : "-"}
                </div>
                <div className="td">
                  <span className="box_content_title">재방문자</span>
                  <br />
                  {zoneName !== "-" ? makeNumber(zoneInfo[5]) + "명" : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BoxBlock>
    );
  }
}

export default ZoneInfo;
