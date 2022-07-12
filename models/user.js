'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        sourceKey: "id",
        foreignKey: "user_id"
      })
      User.hasMany(models.Order, {
        sourceKey: "id",
        foreignKey: "buyer_id"
      })
    }
  };
  User.init({
    full_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot empty'
        },
        isEmail: {
          args: true,
          msg: 'Must Filled email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot empty'
        },
        len: {
          args: [6],
          msg: "Password min 6 character"
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    image_url: DataTypes.STRING,
    city: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};