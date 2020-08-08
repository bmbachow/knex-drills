const { expect } = require("chai")
const knex = require('knex')
const ShoppingListService = require("../src/shopping-list-service")

describe(`Shopping List Service object`, function () {
  let db
  let testShoppingItems = [
    {
      id: 1,
      name: 'First test shopping item!',
      price: '13.5',
      category: 'Main',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      name: 'Second test shopping item!',
      price: '10.0',
      category: 'Snack',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
    },
    {
      id: 3,
      name: 'Third test shopping item!',
      price: '8.4',
      category: 'Breakfast',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testShoppingItems)
    })

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }))
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems)
        })
    })

    it(`getById() resolves an article by id from 'shopping_list' table`, () => {
      const thirdId = 3
      const thirdTestItem = testArticles[thirdId - 1]
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            category: thirdTestItem.category,
            date_added: thirdTestItem.date_added,
            checked: false,
          })
        })
    })

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const itemId = 3
      return ShoppingListService.deleteItem(db, articleId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allArticles => {
          const expected = testItems.filter(item => item.id !== itemId)
          expect(allItems).to.eql(expected)
        })
    })

    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3
      const newItemData = {
        name: 'updated name',
        price: '5.55',
        category: 'updated content',
        date_published: new Date(),
      }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          })
        })
    })
  })

  // context(`Given 'shopping_list' has no data`, () => {
  //   it(`getAllArticles() resolves an empty array`, () => {
  //     return ShoppingListService.getAllArticles(db)
  //       .then(actual => {
  //         expect(actual).to.eql([])
  //       })
  //   })

  //   it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
  //     const newArticle = {
  //       title: 'Test new title',
  //       content: 'Test new content',
  //       date_published: new Date('2020-01-01T00:00:00.000Z'),
  //     }

  //     return ShoppingListService.insertArticle(db, newArticle)
  //       .then(actual => {
  //         expect(actual).to.eql({
  //           id: 1,
  //           title: newArticle.title,
  //           content: newArticle.content,
  //           date_published: new Date(newArticle.date_published),
  //         })
  //       })
  //   })
  // })
})

