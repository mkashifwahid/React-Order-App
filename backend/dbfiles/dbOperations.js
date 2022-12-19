import config from './dbConfig.js';
import sql from 'mssql';
import Product from '../models/productModel.js';
// import product from './productCart.js';

async function getProducts() {
  try {
    console.log('product');
    let pool = await sql.connect(config);
    let products = await pool.request().query('exec sp_GetItem');
    return products;
    // return await Product.create({
    //   Id: products.Id,
    //   ItemCode: products.recordsets.ItemCode,
    //   ItemDesc: products.recordsets.ItemDesc,
    //   ItemUnit: products.recordsets.ItemUnit,
    //   ItemRate: products.recordsets.ItemRate,
    //   ItemDisc: products.recordsets.ItemDisc,
    //   ItemSTax: products.recordsets.ItemSTax,
    //   Cmp_Name: products.recordsets.Cmp_Name,
    //   Group_Desc: products.recordsets.Group_Desc,
    // }).then(function (products) {
    //   if (products) {
    //     console.log(products, '12');
    //     return products;
    //   } else {
    //     console.log(products, '13');
    //   }
    // });
    //return products;
  } catch (error) {
    console.log(error);
  }
}

async function getBookerUser(_code) {
  try {
    let pool = await sql.connect(config);
    let bookers = await pool.request().query(`exec sp_GetBookers '${_code}'`);
    return bookers.recordset;
    // return await Product.create({
    //   Id: products.Id,
    //   ItemCode: products.recordsets.ItemCode,
    //   ItemDesc: products.recordsets.ItemDesc,
    //   ItemUnit: products.recordsets.ItemUnit,
    //   ItemRate: products.recordsets.ItemRate,
    //   ItemDisc: products.recordsets.ItemDisc,
    //   ItemSTax: products.recordsets.ItemSTax,
    //   Cmp_Name: products.recordsets.Cmp_Name,
    //   Group_Desc: products.recordsets.Group_Desc,
    // }).then(function (products) {
    //   if (products) {
    //     console.log(products, '12');
    //     return products;
    //   } else {
    //     console.log(products, '13');
    //   }
    // });
    //return products;
  } catch (error) {
    console.log(error);
  }
}

const createCart = async (Product) => {
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

export default { getProducts, getBookerUser, createCart };
