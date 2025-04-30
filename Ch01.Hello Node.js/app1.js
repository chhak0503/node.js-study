/*
  날짜 : 0000/00/00
  이름 : 김철학
  내용 : Hello Node.js 실습하기    
  
  - 기본 Node.js http 모듈을 이용한 서버
*/

const http = require("http");
let count = 0;

const server = http.createServer((req, res) => {
  console.log("count : " + (count += 1));
  res.write("Hello Node.js");
  res.end();
});

server.listen(3000, () => {
  console.log("app1 실행 중...");
});
