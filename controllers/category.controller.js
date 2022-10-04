let express = require(`express`);
let categoryRouter = express.Router();

let { categoryService } = require(`../services/category.service`);
let { executeWithSync } = require(`../connections/sequelize.connection`);

categoryRouter.get(`/all`, function (request, response) {
  executeWithSync(
    categoryService
      .getCategories()
      .then((data) => {
        return data.map((single) => single.dataValues);
      })
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(200);
        let msg2 = `Successfully fetched categories`;
        data = { msg: msg2, success: true, ...data };
        response.end(JSON.stringify(data));
        // console.log(JSON.stringify(data));
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while fetching categories`, error);
        response.end(
          JSON.stringify({
            message: "error occured",
          })
        );
      })
  );
  //   response.send(`successfully hit to the router`);
});

categoryRouter.post(`/`, function (request, response) {
  executeWithSync(
    categoryService
      .createCategories(request.body)
      .then((data) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(200);
        response.end(JSON.stringify(data));
      })
      .catch((error) => {
        response.setHeader(`content-type`, `application/json`);
        response.writeHead(500);
        console.log(`Error occured while creating categories`, error);
        response.end(
          JSON.stringify({
            message: `error occured`,
          })
        );
      })
  );
});

module.exports = {
  categoryRouter,
};
