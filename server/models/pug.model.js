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


// Arrow functions don't bind its own this context
Pug.prototype.isPuppy = function() { 
  return this.age < 1;
};

Pug.prototype.shortBio = function() {
  let firstPunctuationIdx;

  // Iterate through the bio
  for(let i =  0; i < this.biography.length; i++) {
    // Check for the first punctuation
    let char = this.biography[i];
    if(char === "." || char === "?" || char === "!") {
      // set the index of the first punctuation
      firstPunctuationIdx = i;
      break;
    }
  }

  return this.biography.slice(0, firstPunctuationIdx);
};


module.exports = Pug;
