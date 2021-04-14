const authMiddleware = require('../middleware/authMiddleware')
const {getFavoritesController, addFavoritesController, removeFavoritesController} = require('../controllers/favoritesController')
module.exports = favoritesRouter = async(fastify) => {
  fastify
    .get('/',{preHandler: authMiddleware},getFavoritesController)
    .post('/', {preHandler: authMiddleware}, addFavoritesController)
    .delete('/:id', {preHandler: authMiddleware}, removeFavoritesController)
}