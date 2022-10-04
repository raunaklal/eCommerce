const { sequelize } = require("../connections/sequelize.connection");
const { DataTypes } = require("sequelize");
const { productSchema } = require(`./product.model`);

function initializeCategorySchema() {
  const categorySchema = sequelize.define("category", {
    id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    },
  });

  categorySchema.hasMany(productSchema, {
    foreignKey: "category_id",
  });

  productSchema.belongsTo(categorySchema, {
    foreignKey: 'category_id'
  })

  return categorySchema;
}

let categorySchema = initializeCategorySchema();

module.exports = {
  categorySchema,
};
