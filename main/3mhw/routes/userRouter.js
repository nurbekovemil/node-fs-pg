const {userRegisterController, userLoginController, userAuthController} = require('../controllers/usersController')
const authMiddleware = require('../middleware/authMiddleware')
module.exports = userRouter = async (fastify, options) => {
  fastify
    .post('/login', userLoginController)
    .post('/register', userRegisterController)
    .get('/auth', {preHandler: authMiddleware}, userAuthController)
}
