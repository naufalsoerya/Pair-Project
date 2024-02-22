'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Comment.belongsToMany(models.Post, { through: models.Home })
      Comment.hasMany(models.Home)
    }
  }
  Comment.init({
    descComment: DataTypes.STRING,
    likeComment: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comment',
    hooks: {
      beforeCreate: (comment, options) => {
        if(comment.descComment) {
          comment.likeComment = 0
        }
      }
    }
  });
  return Comment;
};