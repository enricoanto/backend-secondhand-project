'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Product, {
        foreignKey: 'product_id',
        targetKey: 'id'
      })
      Notification.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        targetKey: 'id'
      })
    }
  };
  Notification.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    base_price: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    status: DataTypes.ENUM('declined', 'accepted', 'bid', 'create'),
    seller_name: DataTypes.STRING,
    buyer_name: DataTypes.STRING,
    receiver_id: DataTypes.INTEGER,
    image_url: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN,
    notification_type: DataTypes.ENUM('buyer', 'seller'),
    order_id: DataTypes.INTEGER
  }, { 
    hooks: {
      beforeCreate: (notif) => {
        notif.read = false
      }
  },
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};