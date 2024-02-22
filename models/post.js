'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../utils/helper');
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

    static async totalLike(id){
      try {
        let totalLike = await Post.sum('likePost', { where: { UserId: { [Op.gt]: id } } });
        if (!totalLike) totalLike = "-"
        return Helper.formatNumb(totalLike)
      } catch (error) {
        throw error
      }
    }
  }
  Post.init({
    title: DataTypes.STRING,
    descPost: DataTypes.STRING,
    likePost: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
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