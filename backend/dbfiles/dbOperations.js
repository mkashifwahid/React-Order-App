import config from './dbConfig.js';
import sql from 'mssql';

export default async function getProducts() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query('exec sp_GetItem');
    return products;
  } catch (error) {
    console.log(error);
  }
}

export const createCart = async (Product) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(`exec sp_AddItem ${Product.Id}, '${Product.ItemCode}'`);
    return products;
  } catch (error) {
    console.log(error);
  }
};
