'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.UserProject)
      Project.hasMany(models.Task)
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Username is required' }
      }
    },
    code: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Password is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });

  Project.beforeCreate((project) => {
    project.password = bcrypt.hashSync(project.password, 10)
  })

  return Project;
};