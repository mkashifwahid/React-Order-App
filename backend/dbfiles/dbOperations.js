import config from './dbConfig.js';
import sql from 'mssql';

export const getProducts = async () => {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query('exec sp_GetItem');
    console.log(products);
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (Product) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(`exec sp_AddItem ${Product.id}, '${Product.itemCode}'`);
    return products;
  } catch (error) {
    console.log(error);
  }
};
