const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    databases: {
      Database1: {
        username: "root", // 로컬 DB 사용자
        password: "785985", // 로컬 DB 비밀번호
        database: "pohang", // 데이터베이스 이름
        host: "localhost", // 로컬 호스트 내 로컬 구동 db
        dialect: "mysql", // MySQL
      },
    },
  },
};
