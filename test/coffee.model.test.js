/* eslint-env mocha, chai */

const {expect} = require('chai')
const {db, Coffee} = require('../server/models')

xdescribe('Coffee model', () => {
  beforeEach(() => db.sync({force: true}))

  xdescribe('column definitions and validations', () => {
    it('has a `name` and `ingredients`', async () => {
      const puppacino = await Coffee.create({
        name: 'Puppaccino',
        ingredients: ['espresso', 'frothed milk', 'love']
      })

      expect(puppacino.name).to.equal('Puppaccino')
      expect(puppacino.ingredients).to.deep.equal(['espresso', 'frothed milk', 'love'])
    })

    it('`name` is required', async () => {
      const coffee = Coffee.build()
      return coffee.validate()
        .then(
          () => {
            throw new Error('Validation should have failed!')
          },
          (err) => {
            expect(err).to.be.an('error')
            expect(err.path).to.equal('name')
            expect(err.type).to.equal('notNull Violation')
          }
        )
    })
  })

  xdescribe('instance method: getIngredients', () => {
    it('returns list of ingredients as a comma-delimited string', async () => {
      const puppacino = await Coffee.create({
        name: 'Puppaccino',
        ingredients: ['espresso', 'frothed milk', 'love']
      })

      const frappeAllaPug = await Coffee.create({
        name: 'Frappe alla Pug',
        ingredients: ['espresso', 'ice', 'sugar', 'love']
      })

      expect(puppacino.getIngredients()).to.equal('espresso, frothed milk, love')
      expect(frappeAllaPug.getIngredients()).to.equal('espresso, ice, sugar, love')
    })
  })

  xdescribe('class method: findByIngredient', () => {
    it('finds coffee by ingredient', async () => {
      await Promise.all([
        Coffee.create({
          name: 'Cafe au Lait',
          ingredients: ['french press', 'scalded milk']
        }),
        Coffee.create({
          name: 'Galao',
          ingredients: ['espresso', 'foam']
        }),
        Coffee.create({
          name: 'Mocha',
          ingredients: ['espresso', 'hot cocoa', 'whipped cream']
        })
      ])
      const drinksWithEspresso = await Coffee.findByIngredient('espresso')
      const drinksWithWhippedCream = await Coffee.findByIngredient('whipped cream')

      expect(drinksWithEspresso.length).to.equal(2)
      expect(drinksWithEspresso.some(drink => drink.name === 'Mocha')).to.equal(true)
      expect(drinksWithEspresso.some(drink => drink.name === 'Galao')).to.equal(true)

      expect(drinksWithWhippedCream.length).to.equal(1)
      expect(drinksWithWhippedCream.some(drink => drink.name === 'Mocha')).to.equal(true)
    })
  })

  xdescribe('hooks', () => {
    // because EVERYTHING in Cody's Cafe is made with love ♥
    it('adds "love" to ingredients if not included', async () => {
      const coffee = await Coffee.create({
        name: 'Cafe con Leche',
        ingredients: ['coffee', 'warm milk']
      })

      expect(coffee.ingredients.indexOf('love') > -1).to.equal(true)

      await coffee.update({
        ingredients: ['coffee', 'hot milk']
      })

      expect(coffee.ingredients.indexOf('love') > -1).to.equal(true)
    })
  })
})