const authMiddleware = require('../middleware/authMiddleware')
const {getFavoritesController, addFavoritesController} = require('../controllers/favoritesController')
module.exports = favoritesRouter = async(fastify) => {
  fastify
    .get('/',{preHandler: authMiddleware},getFavoritesController)
    .post('/', {preHandler: authMiddleware}, addFavoritesController)
}