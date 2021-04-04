require('dotenv').config()
const fastify = require('fastify')()
const PORT = process.env.PORT || 3000
const client = require('./conf/db')


fastify.addContentTypeParser('application/json', {
    parseAs: 'string' }, 
    (req, body, done)=>{
        try {
          const json = JSON.parse(body)
          done(null, json)
        } catch (err) {
          err.statusCode = 400
          done(err, undefined)
        }
  })
  .register(require('./routes/userRouter'), {
    prefix: '/api/user'
  })
  .register(require('./routes/productRouter'), {
    prefix: '/api/product'
  })
  .register(require('./routes/categoryRouter'), {
    prefix: '/api/category'
  })
  .register(require('./routes/favoritesRouter'), {
    prefix: '/api/favorites'
  })
  client.connect(() => {
    fastify.listen(PORT, err => {
      if (err) throw err
      console.log(`server listening on ${PORT}`)
    })
  })
