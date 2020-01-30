const Sequelize = require('sequelize')

const db = require('./database')

const Coffee = db.define('coffee', {
  name:{ 
    type: Sequelize.STRING, 
    allowNull: false
  },
  // Need to be an array WITH strings
  ingredients:  Sequelize.ARRAY(Sequelize.STRING)
}, 
// The second argument in  the define method is for add hooks 
{
  hooks: { 
    // execute a check for the love and add ingredient if not include
    beforeValidate: coffeeInstance => { 
      if(!coffeeInstance.ingredients.includes('love')) {
        coffeeInstance.ingredients.push('love');
      }
    }
  }
});

Coffee.findByIngredient = async function(coffee) {

  const Op = Sequelize.Op;
  
  const drinksWithCoffee = await Coffee.findAll({
    where: { 
      // Add the column for relevant for coffee
      ingredients: {
        [Op.contains]:[coffee]
      }
    }
  })
  
  return drinksWithCoffee;
};

Coffee.prototype.getIngredients = function() {
  return this.ingredients.join(', ');
};

module.exports = Coffee;
