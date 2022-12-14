/* 
 - express is a library that would be used for routing purposes.
*/
const express = require("express");
const serverConfig = require("./configs/server.config");
const { categoryRouter } = require(`./controllers/category.controller`);
const { productRouter } = require(`./controllers/product.controller`);

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

// app.get("/api/v1", function (request, response) {
//   response.writeHead(200);
//   response.end(`Connecting Successfully`);
// });

app.listen(serverConfig.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${serverConfig.PORT}`);
});
