const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async (req, res, next) => {
  try {
    const allCoffee = await Coffee.findAll();
    res.status(200).send(allCoffee);

  } catch (error) {
    console.log('This is the error ', error);
    next(error);
  }
})

router.get('/ingredients/:ingredients', async (req, res, next ) => {
  try {
    const ingredients = req.params.ingredients;
    const allCoffeeWithIngredient = await Coffee.findByIngredient(ingredients)
    res.status(200).send(allCoffeeWithIngredient);
  } catch (error) {
    console.log('This is the error ',error);
    next(error);
  }
})

router.get('/:coffeeId', async (req, res, next ) => {
  try {
    const coffee = req.params.coffeeId;
    console.log("TCL: coffee", coffee);
  
  } catch (error) {
    console.log('This is the error ', error);
    next(error);
  }
});
module.exports = router
