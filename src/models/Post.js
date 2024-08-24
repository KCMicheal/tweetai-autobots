const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const Autobot = require('./Autobot'); // Import the Autobot model for associations

const Post = sequelize.define('Post', {
    autbotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Autobots',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false  // Disable createdAt and updatedAt
});

Autobot.hasMany(Post, { foreignKey: 'autbotId', onDelete: 'CASCADE' });
Post.belongsTo(Autobot, { foreignKey: 'autbotId' });

module.exports = Post;
