'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.Users)
      Posts.belongsToMany(models.Comments, {through: models.Homes})
    }
  }
  Posts.init({
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    likeCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};