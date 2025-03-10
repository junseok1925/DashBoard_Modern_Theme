import styled, { createGlobalStyle } from "styled-components";

export const Block = styled.div`
  .darkblock {
    display: flex;
    .curtime {
      color: white;
      left: 10%;
      top: -35px;
      font-size: 12pt;
      width: 20%;
      margin-top: 15px;
      padding-right: 5px;
      float: right;
      font-size: 13pt;
    }
    .toggleBG {
      background: #cccccc;
      width: 40px;
      height: 20px;
      border: 1px solid #cccccc;
      border-radius: 15px;
      position: absolute;
      top: 75px;
      right: 20px;
    }
    .toggleFG {
      background: #ffffff;
      width: 15px;
      height: 15px;
      border: none;
      border-radius: 15px;
      position: relative;
      float: left;
      margin: 3px 0 0 2px;
    }
  }
  .lightblock {
    // display: flex;
    background: rgba(34, 34, 46, 0.8);
    /* ✅ 테두리 추가 */
    border: 0.1px solid rgba(34, 34, 46, 0.8);
    .curtime {
      color: black;
      left: 10%;
      top: -35px;
      font-size: 12pt;
      font-weight: bold;
      width: 10%;
      margin-top: 15px;
      padding-right: 5px;
      float: left;
      font-size: 13pt;
      opacity: 0.8;
    }
    .toggleBG {
      background: #cccccc;
      width: 40px;
      height: 20px;
      border: 1px solid #cccccc;
      border-radius: 15px;
      position: absolute;
      top: 75px;
      right: 20px;
    }

    .toggleFG {
      background: #ffffff;
      width: 15px;
      height: 15px;
      border: none;
      border-radius: 15px;
      position: relative;
      float: right;
      margin: 3px 2px 0 0;
    }
  }
`;

export const Topnavmenu = styled.div`
  //margin-left:9%;
  margin-bottom: 17px;
  width: 100%;
  //height: 50px;
  text-align: center;

  .top_menu_b {
    text-transform: uppercase;
    width: 350px;
    border: 0;
    height: 100%;
    text-align: center;
    color: #606e8e;
    font-size: 20px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 0 0 0 0;
    margin: 0 1px 0 1px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 7px 5px -5px #8392a7 inset;
    opacity: 0.9;
  }
  .top_menu_b:hover,
  .top_menu_b:active,
  .top_menu_b:focus {
    background: rgb(45, 47, 51);
    color: #cccfd8;
  }
  .top_menu_b_on {
    width: 320px;
    background: #21212e;
    color: #fff;
  }

  .top_menu_b_off {
    width: 340px;
    background: #333344;
    color: #fff;
  }

  .high {
    height: 60px;
  }

  .sub_menu_box2 {
    margin-top: 10px;
    text-align: left;
    margin-left: 50%;
  }
  .button_off {
    //background: #7b8df8;
    background: rgba(0, 0, 0, 0);
    border: 0;
  }
  .button_on {
    //background: #d5d5d5;
    background: rgba(0, 0, 0, 0);
    border: 0;
    border-bottom: 3.5px solid #7b8df8;
  }
  .top_analysis_b3 {
    text-transform: uppercase;
    text-align: center;
    color: black;
    font-size: 15px;
    font-weight: bolder;
    cursor: pointer;
    padding: 0px 10px 0px 10px;
    margin: 0;
    //border-radius: 5px;
  }
`;
