const client = require('../conf/db')

const getCategoriesController = async(req, res) => {
  try{
    await client.query(`
    SELECT C.category_id, C.category_name, count (P.product_id) as products_quantity 
      FROM categories C LEFT JOIN products P ON P.category_id = C.category_id 
      GROUP BY  C.category_id ORDER BY C.category_id ASC
    `, (err, result) => {
      if(err) return res.status(400).send({msg:'Ошибка при получении данных!'})
      res.status(200).send({categories: result.rows})
    })
  }catch(err){
    res.status(400).send({msg: 'Ошибка при получении данных!'})
  }
}

module.exports = {getCategoriesController}