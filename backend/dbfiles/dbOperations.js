import config from './dbConfig.js';
import sql from 'mssql';
import Product from '../models/productModel.js';

export default async function getProducts() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query('exec sp_GetItem');
    console.log(products, 'aaaa');
    return await Product. ({
      Id: products.body.Id,
      ItemCode: products.body.ItemCode,
      ItemDesc: products.body.ItemDesc,
      ItemUnit: products.body.ItemUnit,
      ItemRate: products.body.ItemRate,
      ItemDisc: products.body.ItemDisc,
      ItemSTax: products.body.ItemSTax,
      Cmp_Name: products.body.Cmp_Name,
      Group_Desc: products.body.Group_Desc,
    }).then(function (products) {
      if (products) {
        return products;
      } else {
      }
    });
    //return products;
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
