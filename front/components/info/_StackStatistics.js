//유동인구 분석 정보카드
import React from "react";
import styled from "styled-components";

const BoxBlock = styled.div`
  text-align: center;
  margin: 0 15% 10px 15%;

  .box_view_compare {
    width: 30%;
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
    color: black;
    //text-shadow: -1px 0px #313131, 0px 1px #313131, 1px 0px #313131, 0px -1px #313131;
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
    color: #f39700;
    font-size: 18px;
  }

  .title_bg {
    background-color: white;
    border-bottom: solid 1px #e4e4e4;
  }

  .tr {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr;
  }

  .num {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bolder;
  }
  .light {
    box-shadow: 0px 0px 5px #cccccc;
  }

  .dark {
    box-shadow: none;
    .box_title {
      font-size: 18px;
      color: #fafbf6;
      text-shadow: -1px 0px #313131, 0px 1px #313131, 1px 0px #313131,
        0px -1px #313131;
      font-weight: bolder;
    }
    .box_content {
      background-color: #2d3653;
      color: #ffffff;
      font-weight: lighter;
      height: 100px;
    }

    .box_content_table {
      font-size: 14px;
    }

    .box_content_title {
      color: #f39700;
      font-size: 18px;
    }

    .title_bg {
      background-color: #3c496e;
      border-bottom: none;
    }

    .num {
      font-size: 24px;
      font-weight: bolder;
    }
  }
`;

function StackStatistics({ Info, theme }) {
  const makeNumber = (param) => {
    return param?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let titleCss = "title_bg";

  return (
    <BoxBlock className="box_view_compare">
      <div className={theme === "dark" ? "dark" : "light"}>
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
