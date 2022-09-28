/* 
 - express is a library that would be used for routing purposes.
*/
const express = require("express");
const serverConfig = require("./configs/server.config");

const app = express();

app.get("/", function (request, response) {
  response.writeHead(200);
  response.end();
});

app.listen(serverConfig.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${serverConfig.PORT}`);
});