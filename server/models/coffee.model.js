const Sequelize = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  name: Sequelize.STRING,
  // Need to be an array WITH strings
  ingredients:  Sequelize.ARRAY(Sequelize.STRING)
});

module.exports = Coffee;
