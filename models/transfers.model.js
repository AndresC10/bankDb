const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderAccountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverAccountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
