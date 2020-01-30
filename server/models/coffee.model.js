const Sequelize = require('sequelize')

const db = require('./database')

const Coffee = db.define('coffee', {
  name:{ 
    type: Sequelize.STRING, 
    allowNull: false
  },
  // Need to be an array WITH strings
  ingredients:  Sequelize.ARRAY(Sequelize.STRING)
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
