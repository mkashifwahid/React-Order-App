import config from './dbConfig.js';
import sql from 'mssql';
import Product from '../models/productModel.js';
// import product from './productCart.js';

export async function getProducts() {
  try {
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

export async function getBookerUser(_code) {
  try {
    let pool = await sql.connect(config);
    let bookers = await pool.request().query(`exec sp_GetBookers '${_code}'`);
    return bookers;
  } catch (error) {
    console.log(error);
  }
}

// export async function getCustomers(_code) {
//   try {
//     let pool = await sql.connect(config);
//     let bookers = await pool.request().query(`exec sp_GetBookers '${_code}'`);
//     return bookers;
//   } catch (error) {
//     console.log(error);
//   }
// }
export async function getCustomers() {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`exec sp_GetCustomers`);
    return customers;
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

//module.exports = { GetProducts: getProducts, GetBookers: getBookerUser };
//module.exports.getBookerUser = bookers;
//export default { getProducts, getBookerUser, createCart };
