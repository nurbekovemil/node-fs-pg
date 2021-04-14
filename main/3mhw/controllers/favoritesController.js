const client = require('../conf/db')

const getFavoritesController = async (req, res) => {
  try {
    await client.query(`
      SELECT  
      F.PRODUCT_ID, P.PRODUCT_NAME
      FROM FAVORITES F 
      INNER JOIN PRODUCTS P
      ON F.PRODUCT_ID = P.PRODUCT_ID WHERE F.USER_ID = $1`,[req.user.user_id], (err, results) => {
      if(err) return res.status(400).send({msg: 'Ошибка при получении данных!'})
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

const removeFavoritesController = async (req, res) => {
  try {
    await client.query('DELETE FROM FAVORITES WHERE PRODUCT_ID = $1', [req.params.id], (err, results) => {
      if(err) return res.status(400).send({msg: err})
      res.status(200).send({msg: 'Товар успешно удален!'})
    })
  } catch (error) {
    
  }
}

module.exports = {getFavoritesController, addFavoritesController, removeFavoritesController}