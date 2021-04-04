const client = require('../conf/db')

const getFavoritesController = async (req, res) => {
  try {
    const product_id = req.params.id, user_id = req.user.user_id
    console.log(product_id, user_id)
    res.status(200).send({product_id, user_id})
  } catch (error) {
    res.status(400).send({msg:'Ошибка при добавлении!'})
  }
}

const addFavoritesController = async (req, res) => {
  try {
    const {product_id} = req.body, user_id = req.user.user_id
    await client.query(`
      INSERT INTO FAVORITES (USER_ID, PRODUCT_ID) VALUES ($1, $2)`, [user_id, product_id], (err) => {
        if(err) return res.status(400).send({msg:'Ошибка при добавлении!'})
        res.status(200).send({msg: 'Товар успешно добавлен!'})
      })
  } catch (error) {
    res.status(400).send({msg:'Ошибка при добавлении!'})
  }
}

module.exports = {getFavoritesController, addFavoritesController}