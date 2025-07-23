const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    databases: {
      Database1: {
        username: "toyadmin",
        password: "!qhRdmafkaus",
        database: "pohang",
        host: "14.63.184.15",
        dialect: "mysql",
      },
    },
  },
};
