const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
//const config2 = require('../config/toyconfig')[env];

const db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];
  console.log("database : ", database);
  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}

//const sequelize = new Sequelize(config.database, config.username, config.password, config); //node, mysql 연결해줌
//const sequelize2 = new Sequelize(config2.database, config2.username, config2.password, config2); //node, mysql 연결해줌

db.User = require("./user")(db["Database1"], Sequelize); //모델 연결
db.Logs = require("./logs")(db["Database1"], Sequelize); //모델 연결
db.Culturescanner = require("./culturescanner")(db["Database1"], Sequelize); //모델 연결
db.Culturezone = require("./culturezone")(db["Database1"], Sequelize); //모델 연결
//db.Ar_data = require("./_ar_data")(db["Database2"], Sequelize);
//db.Report = require('./report')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  // 모델연결한거 하나하나 등록
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize1 = db["Database1"];
//db.sequelize2 = db["Database2"];
//db.sequelize3 = db['Database3'];
db.Sequelize = Sequelize;
//db.sequelize2 = sequelize2;

module.exports = db;
