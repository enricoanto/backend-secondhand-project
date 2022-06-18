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
    }
  };
  Notification.init({
    product_id: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    status: DataTypes.STRING,
    seller_name: DataTypes.STRING,
    buyer_name: DataTypes.STRING,
    receiver_id: DataTypes.INTEGER,
    image_url: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
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