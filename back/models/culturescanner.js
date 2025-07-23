module.exports = (sequelize, DataTypes) => {
  const Culturescanner = sequelize.define(
    "culture_scanner",
    {
      //'User' -> users 테이블로 mysql로 저장
      //id는 기본적으로 적혀있음
      zone: {
        type: DataTypes.STRING(50),
        allowNull: false, //필수
      },
      region: {
        type: DataTypes.STRING(50),
        allowNull: true, //필수
      },
      zoneid: {
        type: DataTypes.STRING(10),
        allowNull: false, //필수
      },
      num: {
        //순서
        type: DataTypes.STRING(30),
      },
      mac: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
      intmac: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
      status: {
        //스캐너 상태
        type: DataTypes.STRING(20),
      },
      type: {
        //실내,실외타입
        type: DataTypes.STRING(20),
      },
      lat: {
        //위도
        type: DataTypes.STRING(30),
      },
      lon: {
        //경도
        type: DataTypes.STRING(30),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  //User.associate = (db) => {}; // 관련성
  return Culturescanner;
};
