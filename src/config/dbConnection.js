const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tweetai', 'tweetai_user', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
