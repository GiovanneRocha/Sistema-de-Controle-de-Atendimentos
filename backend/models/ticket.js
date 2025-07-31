const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM('aberto', 'em_andamento', 'resolvido', 'fechado'),
      defaultValue: 'aberto'
    }
  });