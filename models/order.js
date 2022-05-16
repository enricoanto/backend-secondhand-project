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
    status: DataTypes.ENUM(['pending', 'accepted', 'declined'])
  }, {
    hooks: {
      beforeCreate: (user)=> {
        user.status = 'pending'
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};