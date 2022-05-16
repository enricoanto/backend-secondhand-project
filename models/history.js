'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "user_id"
      })
    }
  };
  History.init({
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};