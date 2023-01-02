import config from './dbConfig.js';
import sql from 'mssql';
import Product from '../models/productModel.js';
import e from 'express';
import Order from '../models/orderModel.js';
import { or } from 'sequelize';
// import product from './productCart.js';

export async function getProducts() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query('exec sp_GetItem');
    return products;
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

export async function addOrder(_customerCode, _bookerCode, ..._items) {
  let transaction;
  let pool = await sql.connect(config);

  try {
    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const request = new sql.Request(transaction);
    // _items.map((x) => {
    //   console.log(x);
    // });

    Order.create;
    _items.forEach((item) => {
      Order.rows.add(
        _bookerCode,
        _customerCode,
        '',
        item.ItemCode,
        item.quantity,
        item.ItemRate,
        item.ItemDisc,
        item.ItemSTax,
        0
      );
    });
    request.input('Order', Order);
    //request.output('SqlOrderId', sql.BigInt);
    const result = await request.execute('sp_AddOrder_H');
    await transaction.commit();
    return result.recordset[0];
  } catch (error) {
    await transaction.rollback();
  } finally {
    await pool.close();
  }
}

export async function getOrderById(_orderId) {
  try {
    let pool = await sql.connect(config);
    let order = await pool
      .request()
      .query(`exec sp_GetOrderById '${_orderId}'`);
    return order;
  } catch (error) {
    console.log(error);
  }
}

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
