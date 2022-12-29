import config from './dbConfig.js';
import sql, { VarChar } from 'mssql';
import Product from '../models/productModel.js';
import e from 'express';
import { orderTable } from '../models/orderModel';
// import product from './productCart.js';

export async function getProducts() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query('exec sp_GetItem');
    return products;
  } catch (error) {}
}

export async function getBookerUser(_code) {
  try {
    let pool = await sql.connect(config);
    let bookers = await pool.request().query(`exec sp_GetBookers '${_code}'`);
    return bookers;
  } catch (error) {}
}

export async function addOrder(_customerCode) {
  let transaction;
  let pool = await sql.connect(config);

  try {
    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const request = new sql.Request(transaction);

    let result = 0;
    let orderId = await request
      .output('SqlBookerhID', sql.BigInt)
      .input('BookerCode', sql.VarChar(15), _customerCode)
      .input('CustomerCode', sql.VarChar(15), _customerCode)
      .execute(`sp_AddOrder_H`);

    await transaction.commit();
    //_orderItems
  } catch (error) {
    await transaction.rollback();
  } finally {
    await pool.close();
  }
}

export async function addOrder(_orderItems, _customerCode, _bookerUserId) {
  try {
    let pool = await sql.connect(config);
    let transaction;
    transaction = new sql.Transaction(config);
    await transaction.begin();
    const request = new sql.Request(transaction);

    let orderId = await request().query(
      `exec sp_AddOrder_H '${_customerCode}'`
    );

    //_orderItems
  } catch (error) {}
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
  } catch (error) {}
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
