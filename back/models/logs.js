module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs',{ //'User' -> users 테이블로 mysql로 저장
    //id는 기본적으로 적혀있음
    field: {
      type: DataTypes.STRING(100),
      allowNull: false, //필수
    },
    context: {
      type: DataTypes.STRING(200),
      allowNull: false, //필수
    },
    date: {
      type: DataTypes.STRING(100),
      //allowNull: false, //필수
    },
    time: {
      type: DataTypes.STRING(100),
      //allowNull: false, //필수
    },
    section : {
      type: DataTypes.STRING(10),
    }

  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', //한글 저장

  });
  //User.associate = (db) => {}; // 관련성
  return Logs;

};