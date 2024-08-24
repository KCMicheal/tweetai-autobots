const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Autobot = sequelize.define('Autobot', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Autobot;
