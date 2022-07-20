'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "buyer_id"
      })
      Order.belongsTo(models.Product, {
        targetKey: "id",
        foreignKey: "product_id"
      })
    }
  };
  Order.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    product_name: DataTypes.STRING,
    base_price: DataTypes.STRING,
    image_product: DataTypes.STRING,
    status: DataTypes.ENUM(['pending', 'accepted', 'declined'])
  }, {
    hooks: {
      beforeCreate: (user)=> {
        user.status = 'pending'
      },
      afterCreate: (order) => {
        console.log(order)
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};