'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    //static method
    static asName(){
      let result;
      if(this.gender === 'Male'){
        result = `${this.userName} - (He)`
      } else if(this.gender === 'Female'){
        result = `${this.userName} - (She)`
      }
      return result;
    }
  }
  Profile.init({
    userName: DataTypes.STRING,
    gender: DataTypes.STRING,
    photoProfile: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};