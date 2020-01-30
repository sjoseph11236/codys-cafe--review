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
    const coffeeId = req.params.coffeeId;
    const coffee =  await Coffee.findById(coffeeId);
    if(coffee) { 
      res.status(200).send(coffee);
    }
    else { 
      // Use send method to send 404
      res.send(404);
    }
  
  } catch (error) {
    console.log('This is the error ', error);
    next(error);
  }
});

router.post('/', async (req, res, next) => { 
  try {
    const coffee = req.body;
    const createdCoffee = await Coffee.create(coffee);
    res.status(201).send(createdCoffee);
  } catch (error) {
    console.log('This is the error ', error);
    next(error);
  }
});

module.exports = router
