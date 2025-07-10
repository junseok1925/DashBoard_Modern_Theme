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
  }
  .box_title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #fafbf6;
    font-weight: bolder;
    padding: 5px 0 5px 0;
    border-radius: 5px 5px 0 0;
  }
  .box_content {
    padding: 0 0 10px 0;
    border-radius: 0 0 5px 5px;
    background-color: #2d2d42;
    color: white;
    font-weight: normal;
  }

  .box_content_table {
    font-size: 20px;
    line-height: 30px;
    //line-height: 21px; //환경정보 있을시
  }

  .box_content_title {
    color: #f8c140;
    font-size: 14px;
  }


  }

  .box_title {
    background: linear-gradient(to top, #4165e5, #3b9bee);
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

  if (zoneInfo === undefined) {
    return <></>;
  } else {
    return (
      <BoxBlock className="box_view_compare">
        <div className={theme === "dark" ? "dark" : "light"}>
          <div className={"box_title"}>{zoneName}</div>

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
