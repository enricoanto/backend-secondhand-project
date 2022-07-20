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
      Product.hasMany(models.ProductCategory, {
        sourceKey: 'id',
        foreignKey: 'product_id'
      })
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        targetKey: 'id',
        foreignKey: 'product_id'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name cannot empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "description cannot empty"
        }
      }
    },
    base_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "base price cannot empty"
        }
      }
    },
    image_url:  DataTypes.STRING,
    image_name: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "location cannot empty"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "user id cannot empty"
        }
      }
    },
    status: DataTypes.ENUM(['available', 'sold', 'full booked']),
  }, {
    hooks: {
      beforeCreate: (product) => {
        product.status = 'available'
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
