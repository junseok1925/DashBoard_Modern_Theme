module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{ //'User' -> users 테이블로 mysql로 저장
    //id는 기본적으로 적혀있음
    userid: {
      type: DataTypes.STRING(30),
      allowNull: false, //필수
      unique: true, //고유한 값
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false, //필수
    },
    authority: {
      type: DataTypes.INTEGER(30),
      //allowNull: false, //필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, //필수
    },
    theme : {
      type: DataTypes.STRING(10),
    },
    section : {
      type: DataTypes.STRING(10),
    },
    lat : {
      type: DataTypes.STRING(50),
    },
    lon : {
      type: DataTypes.STRING(50),
    },
  


  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', //한글 저장

  });
  //User.associate = (db) => {}; // 관련성
  return User;

};