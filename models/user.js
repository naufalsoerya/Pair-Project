'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
const Helper = require('../utils/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }

    get userDate(){
      return Helper.formatDate(this.createdAt)
    }

  }
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: `Email is required`
        },
        notEmpty:{
          msg: `Email is required`
        },
        isEmail:{
          msg: `Email format (foo@bar.com)`
        },
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: `Password is required`
        },
        notEmpty:{
          msg: `Password is required`
        },
        len:{
          args: 8,
          msg: 'Password must be 8 characters or more'
        },
      }
    }
  }, {
    hooks:{
      beforeCreate: (user, option) => {
        //Disini pengecekan Bcrypt
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};