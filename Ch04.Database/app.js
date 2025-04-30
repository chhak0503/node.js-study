/**
	날짜 : 0000/00/00
	이름 : 홍길동
	내용 : Node.js 데이터베이스

	// Ch04부터 Generator로 프로젝트 생성하기
	// node express generator설치(최초 한번)
	npm install -g express-generator

	// node express 프로젝트 생성
	express <프로젝트명> --view=ejs

	// 패키지 설치
	cd <프로젝트명>
	(필수) npm install
	(필수) npm install -D nodemon
	(선택) npm install mysql2
	(선택) npm install mongoose
	(선택) npm install axios

	// 프로젝트 실행
	npm run start
	npm run dev (package.json 파일에서 scripts - nodemon 설정 해야됨)

	// 브라우저 확인
	http://localhost:3000
*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const connect = require("./schemas");

var indexRouter = require("./routes/index");
var user1Router = require("./routes/user1");
var user2Router = require("./routes/user2");


var app = express();

// mongoDB 접속 실행
connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user1", user1Router);
app.use("/user2", user2Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
