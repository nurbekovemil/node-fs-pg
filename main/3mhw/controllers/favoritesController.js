const client = require('../conf/db')

const getFavoritesController = async (req, res) => {
  try {
    await client.query(`SELECT * FROM FAVORITES WHERE USER_ID = $1`,[req.user.user_id], (err, results) => {
      if(err) return res.status(400).send({msg: 'Пусто! добавьте товар в избранное!'})
      res.status(200).send({products: results.rows})
    })
  } catch (error) {
    res.status(400).send({msg:'Ошибка при получении данных!'})
  }
}

const addFavoritesController = async (req, res) => {
  try {
    const {product_id} = req.body, 
          user_id = req.user.user_id
    await client.query(`
      INSERT INTO FAVORITES (USER_ID, PRODUCT_ID) VALUES ($1, $2)`, [user_id, product_id], (err) => {
        if(err) return res.status(400).send({msg:'Ошибка при добавлении данных!'})
        res.status(200).send({msg: 'Товар успешно добавлен!'})
      })
  } catch (error) {
    res.status(400).send({msg:'Ошибка при добавлении!'})
  }
}

module.exports = {getFavoritesController, addFavoritesController}