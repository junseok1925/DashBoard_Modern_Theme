//유동인구 분석 정보카드
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
    font-weight: 500;
  }

  .box_content_table {
    font-size: 20px;
    line-height: 21px;
    padding-top: 10px;
    color: white;
  }

  .box_content_title {
    color: #f8c140;
    font-size: 14px;
  }

  .light {
  }

  .dark {
    .box_content {
      background-color: #354060;
      color: #ffffff;
      font-weight: lighter;
    }
  }
  .box_title {
    background: linear-gradient(to top, #4165e5, #3b9bee);
  }

  .tr {
    display: grid;
    grid-template-columns: 2fr 2fr;
  }
`;

function FloatPopulationInfo({ zoneName, zoneInfo, zoneIndex, theme }) {
  const makeNumber = (param) => {
    return param?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BoxBlock className="box_view_compare">
      <div className={theme === "dark" ? "dark" : "light"}>
        {/* <!--지역명--> */}
        <div className={"box_title"}>{zoneName}</div>
        {/* <!--분석내용--> */}
        <div className="box_content">
          <div className="box_content_table">
            <div className="tr">
              <div className="td">
                <span className="box_content_title">방문객 수</span>
                <br />
                {makeNumber(zoneInfo[0]) + "명"}
              </div>
              <div className="td">
                <span className="box_content_title">재방문객수</span>
                <br />
                {makeNumber(zoneInfo[1]) + "명"}
              </div>
            </div>
            <br />
            <div className="tr">
              <div className="td">
                <span className="box_content_title">체류인원</span>
                <br />
                {makeNumber(zoneInfo[2]) + "명"}
                <br />
              </div>
              <div className="td">
                <span className="box_content_title">체류시간</span>
                <br />
                {makeNumber(zoneInfo[3]) + "분"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxBlock>
  );
}

export default FloatPopulationInfo;
