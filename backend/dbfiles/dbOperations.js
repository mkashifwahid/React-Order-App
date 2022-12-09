import config from './dbConfig.js';
import sql from 'mssql';

async function getProducts() {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query('exec sp_GetItem');
    console.log(products);
    return products;
  } catch (error) {
    console.log(error);
  }
}

export default getProducts;
