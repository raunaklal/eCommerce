let express = require(`express`);
let productRouter = express.Router();

let { productService } = require(`../services/product.service`);
let { executeWithSync } = require(`../connections/sequelize.connection`);

productRouter.get(`/all`, function (request, response) {
  executeWithSync(
    productService
      .getProducts()
      .then((data) => {
        return data.map((single) => single.dataValues);
      })
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(200);
        response.end(JSON.stringify(data));
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while fetching Products`, error);
        response.end(
          JSON.stringify({
            message: "error occured",
          })
        );
      })
  );
});

productRouter.get(`/:id`, function (request, response) {
  executeWithSync(
    productService
      .getProductById(request.params.id)
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(200);
        if (data !== null) {
          response.end(JSON.stringify(data.dataValues));
        } else {
          response.end(
            JSON.stringify({
              message: `No product found`,
            })
          );
        }
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while fetching Products`, error);
        response.end(
          JSON.stringify({
            message: "error occured",
          })
        );
      })
  );
});

productRouter.get(`/`, function (request, response) {
  console.log(request.query);
  executeWithSync(
    productService
      .getProductsByFilters(request.query)
      .then((data) => {
        return data.map((single) => single.dataValues);
      })
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(200);
        response.end(JSON.stringify(data));
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while fetching Products`, error);
        response.end(
          JSON.stringify({
            message: "error occured",
          })
        );
      })
  );
});

productRouter.post(`/`, function (request, response) {
  executeWithSync(
    productService
      .createProducts(request.body)
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(201);
        response.end(JSON.stringify(data.dataValues));
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while fetching Products`, error);
        response.end(
          JSON.stringify({
            message: `error occured`,
          })
        );
      })
  );
});

module.exports = {
  productRouter,
};
