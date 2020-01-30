const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define('pugs', {
  // your code here
  name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  age: { 
    type: Sequelize.INTEGER,
    defaultValue: 0
  }, 
  biography: Sequelize.TEXT
});

Pug.prototype.isPuppy = puppyInstance  => { 
console.log("TCL: puppyInstance", puppyInstance);

}

module.exports = Pug;
