let { productSchema } = require(`../models/product.model`);
let { categorySchema } = require(`../models/category.model`);
const { Op } = require("sequelize");

class ProductService {
  constructor() {
    this.schema = productSchema;
  }

  createProducts(product) {
    return this.schema.create(product);
  }

  getProducts() {
    return this.schema.findAll();
  }

  getProductsByFilters(filters) {
    // console.log(`Inside function: `,filters);
    // filters["maxPrice"] = parseInt(filters["maxPrice"]);
    let minPrice, maxPrice;
    if (filters[minPrice]) {
      minPrice = parseInt(filters["minPrice"]);
    } else {
      minPrice = 0;
    }
    if (filters[maxPrice]) {
      maxPrice = parseInt(filters["maxPrice"]);
    } else {
      maxPrice = 100000;
    }

    return this.schema.findAll({
      where: {
        price: {
          [Op.and]: {
            [Op.between]: [minPrice, maxPrice],
            // [Op.lte]: maxPrice,
            // [Op.gte]: minPrice,
          },
        },
      },
      include: [
        {
          required: true,
          model: categorySchema,
        },
      ],
    });
  }

  getProductById(id) {
    return this.schema.findOne({
      where: {
        id: id,
      },
      include: [
        {
          required: true,
          model: categorySchema,
        },
      ],
    });
  }
}

let productService = new ProductService();

module.exports = {
  productService,
};
