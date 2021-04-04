const {getCategoriesController} = require('../controllers/categoriesController')
module.exports = getCategories = async (fastify) => {
  fastify.get('/', getCategoriesController)
}