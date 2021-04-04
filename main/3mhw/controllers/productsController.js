const client = require('../conf/db')

const addProductController = async (req, res) => {
  try{
    const {product_name, category_id} = req.body
    await client.query(`
        INSERT INTO PRODUCTS (PRODUCT_NAME, CATEGORY_ID)
        VALUES ($1, $2)`, [product_name, category_id], (err, results) => {
          if(err) return res.status(400).send({msg: 'Ошибка при добавлении товара!'})
          return res.status(200).send({msg: 'Товар успешно добавлен!'})
        }
      )
  }catch(err){
    res.status(400).send({msg:'error add product'})
  }
}

const getProductsController = async(req, res) => {
  try{
    const category_id = req.params.id
    let products
    if(category_id) {
      products = await client.query(`SELECT * FROM PRODUCTS WHERE CATEGORY_ID = $1`, [category_id])
      return res.status(200).send({products: products.rows})
    }
    products = await client.query(`SELECT * FROM PRODUCTS`)
    res.status(200).send({products: products.rows})
  } catch(err) {
    return res.status(400).send({msg: err})
  }
}

const deleteProductController = async(req, res) =>{
  try {
    await client.query("DELETE FROM PRODUCTS WHERE PRODUCT_ID = $1", [req.params.id], (err) => {
      if(err) return res.status(400).send({msg:'Ошибка при удалении товара!'})
      res.status(200).send({msg: 'Товар успешно удален!'})
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {addProductController, getProductsController, deleteProductController}