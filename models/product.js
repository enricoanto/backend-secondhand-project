'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'user_id'
      })
      Product.hasMany(models.Order, {
        sourceKey: "id",
        foreignKey: "product_id"
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    base_price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    image_url: DataTypes.STRING,
    image_name: DataTypes.STRING,
    location: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
