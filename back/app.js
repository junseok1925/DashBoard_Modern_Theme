// use 안에는 middleware들어감

//로그인 정보, jsreport 서버 연결과 리포트 파일 저장하는 백엔드 서버입니다.
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

const userRouter = require("./routes/user");
const accountsRouter = require("./routes/accounts");
const reportRouter = require("./routes/report");
const logRouter = require("./routes/log");
const scannerRouter = require("./routes/scanner");
//const ardataRouter = require("./routes/ardata");

const db = require("./models");
const passportConfig = require("./passport");
const morgan = require("morgan");

dotenv.config();

const app = express();

// 백엔드 처음 실행시 mysql에 DB 만드는 문장 : npx sequelize db:create
db.sequelize1
  .sync()
  .then(() => {
    console.log("db1연결성공");
  })
  .catch(console.error);

passportConfig();

app.use(express.json({ limit: "50000mb" }));
app.use(express.urlencoded({ limit: "50000mb", parameterLimit: 50000000 }));

app.use(
  cors({
    // origin:'http://localhost:3001',
    origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "report"))); // report 폴더 경로를 프론트에서 접근할 수 있게해줌
app.use(express.json()); // req.body에 내용 넣어 줌 -> json 형식으로 데이터 보냈을 때
app.use(express.urlencoded({ extended: true })); // onsubmit형식으로 데이터 보냈을 때 url 형식으로 받아옴
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, //해킹되면 안됨 랜덤문자열 만들어주는
  })
);
app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: 500000000 }));

app.get("/", (req, res) => {});

app.use("/user", userRouter); //user로 라우터 분리했던거 연결
app.use("/accounts", accountsRouter);
app.use("/report", reportRouter);
app.use("/log", logRouter);
app.use("/scanner", scannerRouter);

app.listen(4000, () => {
  console.log("서버가 4000번 포트에서 실행 중입니다.");
});
