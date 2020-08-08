// function mostPopularVideosForDays(days) {
//   knexInstance
//     .select('video_name', 'region')
//     .count('date_viewed AS views')
//     .where(
//       'date_viewed',
//       '>',
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//     )
//     .from('whopipe_video_views')
//     .groupBy('video_name', 'region')
//     .orderBy([
//       { column: 'region', order: 'ASC' },
//       { column: 'views', order: 'DESC' },
//     ])
//     .then(result => {
//       console.log(result)
//     })
// }

// mostPopularVideosForDays(30)

require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log('knex and driver installed correctly');


function getItemsWithText(searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

getItemsWithText('fish')

// function paginateProducts(pageNumber) {
//   const productsPerPage = 6
//   const offset = productsPerPage * (pageNumber - 1)
//   knexInstance
//     .select('id', 'name', 'price', 'date_added', 'checked', 'category')
//     .from('shopping_list')
//     .limit(productsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result)
//     })
// }

// paginateProducts(2)

// function addedAfterDate(daysAgo){
//   knexInstance
//     .select('name', 'price', 'category', 'date_added')
//     .from('shopping_list')
//     .where('date_added', '>', knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo))
//     .then(result => {
//       console.log(result)
//     })
// }

// addedAfterDate(30)

// function costPerCategory() {
//   knexInstance
//     .select('category')
//     .sum('price as total')
//     .from('shopping_list')
//     .groupBy('category')
//     .then(result => {
//       console.log('COST PER CATEGORY')
//       console.log(result)
//     })
// }

// costPerCategory()