const client = require('../conf/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateJwt = (user_id) => {
  return jwt.sign(
      {user_id},
      process.env.JWT_SECRET_KEY,
      {expiresIn: '24h'}
  )
}

const userLoginController = async (req, res) => {
  try {
    const {email, password} = req.body
    if(!email.trim() || !password.trim()) return res.status(400).send({msg: 'Поле не может быть пустым!'})
    const isUser = await client.query('SELECT * FROM USERS WHERE USER_EMAIL = $1', [email])
    if(isUser.rowCount <= 0) return res.status(400).send({msg:'Пользователь не найден!'})
    const comparePassword = await bcrypt.compare(password, isUser.rows[0].user_password)
    if(!comparePassword) return res.status(400).send({msg: 'Неверный пароль!'})
    const token = generateJwt(isUser.rows[0].user_id)
    res.status(200).send({user: isUser.rows[0], token})
  } catch(err) {
    res.status(400).send({msg: err})
  }
}

const userRegisterController = async(req, res) => {
  try {
    const {username, email, password} = req.body
    if(!username.trim() || !email.trim() || !password.trim()) return res.status(400).send({msg: 'Поле не может быть пустым!'})
    const isUser = await client.query('SELECT USER_EMAIL FROM USERS WHERE USER_EMAIL = $1', [email])
    if(isUser.rowCount > 0) return res.status(400).send({msg: `Пользователь с таким ${email} уже существует!`})
    const hashPassword = await bcrypt.hash(password, 5);
    await client.query(
      'INSERT INTO USERS(USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES($1, $2, $3) RETURNING *',[username, email, hashPassword],(err, results)=>{
        if(err) return res.status(400).send({msg: err})
        const token = generateJwt(results.rows[0].user_id)
        res.status(200).send({msg: 'Регистрация прошло успешно!', user: results.rows[0], token})
    })
  }catch(err){
    res.status(400).send({msg: err})
  }
}
module.exports = {userRegisterController, userLoginController}