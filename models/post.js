'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsToMany(models.Comment, {through: 'Home'})
    }
  }
  Post.init({
    title: DataTypes.STRING,
    descPost: DataTypes.STRING,
    likePost: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (post, options) => {
        if(post.descPost) {
          post.likePost = 0
        }
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};