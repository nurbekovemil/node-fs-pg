const jwt = require('jsonwebtoken')
module.exports = authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') next()
  try{
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).send({msg: 'Ошибка авторизации!'})
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  }catch(err){
    res.status(401).send({msg: 'auth err'})
  }
}