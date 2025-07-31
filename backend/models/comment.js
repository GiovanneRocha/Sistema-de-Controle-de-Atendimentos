const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.TEXT, allowNull: false }
  });