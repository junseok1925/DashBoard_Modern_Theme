module.exports = (sequelize, DataTypes) => {
  const Culturezone = sequelize.define(
    "culture_zone",
    {
      //'User' -> users 테이블로 mysql로 저장
      //id는 기본적으로 적혀있음
      zone: {
        type: DataTypes.STRING(50),
        allowNull: false, //필수
      },
      region: {
        type: DataTypes.STRING(50),
        allowNull: false, //필수
      },
      zoneid: {
        type: DataTypes.STRING(10),
        allowNull: false, //필수
      },
      zonename: {
        type: DataTypes.STRING(10),
      },
      lat: {
        //위도
        type: DataTypes.STRING(30),
      },
      lon: {
        //경도
        type: DataTypes.STRING(30),
      },
      radius: {
        //원 영역 크기
        type: DataTypes.STRING(30),
      },
      boundstartlat: {
        //영역시작위도
        type: DataTypes.STRING(30),
      },
      boundstartlon: {
        //영역시작경도
        type: DataTypes.STRING(30),
      },
      boundendlat: {
        //영역끝위도
        type: DataTypes.STRING(30),
      },
      boundendlon: {
        //영역끝경도
        type: DataTypes.STRING(30),
      },
      boundcolor: {
        //영역색상
        type: DataTypes.STRING(30),
      },
      textlat: {
        //영역색상
        type: DataTypes.STRING(30),
      },
      textlon: {
        //영역색상
        type: DataTypes.STRING(30),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  //User.associate = (db) => {}; // 관련성
  return Culturezone;
};
