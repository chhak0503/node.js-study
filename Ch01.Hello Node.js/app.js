/*
  날짜 : 0000/00/00
  이름 : 김철학
  내용 : Hello Node.js 실습하기    

  실행
   - node ./app.js
*/

// 기본 Node.js http 모듈을 이용한 서버
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;

  res.setHeader("Content-Type", "text/html");

  if (path == "/") {
    res.end("Hello Node.js...");
  }

  if (path == "/hello") {
    res.end("Hello Node.JS...");
  }

  if (path == "/welcome") {
    res.end("Welcome Node.JS...");
  }

  if (path == "/greeting") {
    res.end("Greeting Node.JS...");
  }
});

server.listen(3000, () => {
  console.log("app 실행 중...");
});
