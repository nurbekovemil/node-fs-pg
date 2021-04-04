const {userRegisterController, userLoginController} = require('../controllers/usersController')
module.exports = userRouter = async (fastify, options) => {
  fastify
    .post('/login', userLoginController)
    .post('/register', userRegisterController)
}
