/*
  날짜 : 0000/00/00
  이름 : 김철학
  내용 : Ch03.Node.js 미들웨어 실습하기
  
  프로젝트 생성
  - mkdir Ch04
  - cd Ch04
  - npm -y init

  패키지 설치
  - npm install express
  - npm install ejs
  - npm install -D nodemon
  - npm install morgan
  - npm install cookie-parser
  - npm install express-session

  실행
  - node ./app.js
  - nodemon ./app.js
*/
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routerIndex = require("./routers/index");
const routerSub1 = require("./routers/sub1");

const app = express();

// Port 설정
app.set("port", process.env.PORT || 3000);

// View template 설정
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

////////////////////////////////////////////////////////
// 자주 사용하는 미들웨어
////////////////////////////////////////////////////////

/*
 1) express.static
  - 정적 자원 파일 경로설정 미들웨어
*/
app.use(express.static(__dirname + "/public"));

/*
  2) morgan
   - Node.js 로깅을 위한 Logger 미들웨어
*/
app.use(morgan("dev")); // 개발 -> dev, 배포 -> combined

/*
  3) express.json(), express.urlencoded()
   - Post payload를 접근(request body)하기 위한 미들웨어
   - express.json은 전송 값이 json일 경우
   - express.urlencoded은 전송 값이 form일 경우
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
  4) cookie-parser
*/
app.use(cookieParser("secret@1234"));
app.use(
  session({
    secret: "secret@1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

// Middleware 설정
app.use(function (req, res, next) {
  console.log("Middle1...");
  next(); // 다음 미들웨어로 이동
});

app.use(function (req, res, next) {
  console.log("Middle2...");
  next(); // 다음 미들웨어로 이동
});

// Router 설정
//app.use("/", routerIndex);
//app.use("/sub1", routerSub1);

app.get("/", (req, res) => {
  //res.send("index"); // 문자열 응답
  res.render("index"); // 템플릿 응답
});

app.get("/sub1/get1", (req, res) => {
  const data = {
    uid: req.query.uid,
  };
  console.log("data : " + JSON.stringify(data));
  res.render("sub1/get1", data);
});

app.get("/sub1/get2", (req, res) => {
  const data = {
    name: req.query.name,
    age: req.query.age,
  };
  console.log("data : " + JSON.stringify(data));
  res.render("sub1/get2", data);
});

app.get("/sub1/post1", (req, res) => {
  res.render("sub1/post1");
});

app.post("/sub1/post1Result", (req, res) => {
  const uid = req.body.uid;
  const pass = req.body.pass;

  const data = {
    uid: uid,
    pass: pass,
  };

  res.render("sub1/post1Result", data);
});

app.get("/sub1/post2", (req, res) => {
  res.render("sub1/post2");
});

app.post("/sub1/post2Result", (req, res) => {
  const data = {
    uid: req.body.uid,
    name: req.body.name,
    hp: req.body.hp,
    age: req.body.age,
  };

  res.render("sub1/post2Result", data);
});

app.get("/sub2/cookie", (req, res) => {
  const user = {
    uid: "a101",
    name: "김유신",
    hp: "010-1234-1001",
    age: 23,
  };

  res.cookie("uid", "a101");
  res.cookie("user", user);
  // 옵션을 사용할 경우
  //res.cookie("user", user, {maxAge:10000});
  res.render("sub/cookie");
});

app.get("/sub2/cookieResult", (req, res) => {
  const user = req.cookies.user;
  res.render("sub/cookieResult", user);
});

app.get("/sub2/cookieClear", (req, res) => {
  res.send("cookieClear!!!");
});

app.get("/sub2/session", (req, res) => {
  const user = {
    uid: "a102",
    name: "김춘추",
    hp: "010-1234-1002",
    age: 21,
  };

  // 세션 저장
  req.session.user = user;
  res.render("sub/session");
});

app.get("/sub2/sessionResult", (req, res) => {
  const user = req.session.user;
  res.render("sub/sessionResult", user);
});

app.get("/sub2/sessionClear", (req, res) => {
  res.send("sessionClear!!!");
});

// Listen 설정
app.listen(app.get("port"), () => {
  console.log(app.get("port") + " 실행 중...");
});
