const {addProductController, getProductsController, deleteProductController} = require('../controllers/productsController')
const authMiddleware = require('../middleware/authMiddleware')

module.exports = productRouter = async (fastify) => {
  fastify
    .get('/:id', getProductsController)
    .post('/', {preHandler: authMiddleware}, addProductController)
    .delete('/:id', {preHandler: authMiddleware}, deleteProductController)
}