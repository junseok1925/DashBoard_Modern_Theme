//유동인구 분석 정보카드
import React from "react";
import styled from "styled-components";

const BoxBlock = styled.div`
  text-align: center;
  font-family: "Pretendard", sans-serif;
  margin: 0 5.7% 10px 5.7%;

  .box_view_compare {
    width: 100%;
    margin: 0px 0 15px 0;
    padding: 0;
    float: left;
    border-radius: 5px;
  }
  .box_title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: white;
    font-weight: 600;
    padding: 5px 0 5px 0;
    border-radius: 5px 5px 0 0;
  }
  .box_content {
    padding: 0 0 10px 0;
    border-radius: 0 0 5px 5px;
    background-color: #191931;
    color: white;
    font-weight: normal;
    height: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .box_content_table {
    font-size: 14px;
    line-height: 21px;
  }

  .box_content_title {
    color: #f8c140;
    font-size: 20px;
  }

  .title_bg {
    background-color: #2d2d42;
    border-bottom: solid 5px black;
  }

  .tr {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr;
  }

  .num {
    margin-top: 10px;
    font-size: 24px;
  }
  .light {
  }
`;

function StackStatistics({ Info, theme }) {
  const makeNumber = (param) => {
    return param?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let titleCss = "title_bg";

  return (
    <BoxBlock className="box_view_compare">
      <div className="light">
        {/* <!--지역명--> */}
        <div className={"box_title " + titleCss}>기간별 통계</div>
        {/* <!--분석내용--> */}
        <div className="box_content">
          <div className="box_content_table">
            <div className="tr">
              <div className="td">
                <span className="box_content_title">방문객수</span>
                <br />
                <div className="num">{makeNumber(Info[0])} 명</div>
              </div>
              <div className="td" />
              <div className="td">
                <span className="box_content_title">재방문객수</span>
                <br />
                <div className="num">{makeNumber(Info[1])} 명</div>
              </div>
              <div className="td" />
              <div className="td">
                <span className="box_content_title">평균체류인원</span>
                <br />
                <div className="num">{makeNumber(Info[2])} 명</div>
              </div>
              <div className="td" />
              <div className="td">
                <span className="box_content_title">평균체류시간</span>
                <br />
                <div className="num">{makeNumber(Info[3])} 분</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxBlock>
  );
}

export default StackStatistics;
