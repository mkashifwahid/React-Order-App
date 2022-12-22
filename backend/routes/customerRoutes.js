import express from 'express';
import Product from '../models/productModel.js';
import { getCustomers } from '../dbfiles/dboperations.js';

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  const customers = await getCustomers();
  res.send(customers.recordset);
});

customerRouter.get(`/Id/:Id`, async (req, res) => {
  //const product = Product.findOne(x) => x.Id === req.params.Id);

  const customers = await getCustomers();
  // const product = await products.recordset.findOne({ where: { Id: req.params.Id } });
  const customer = customers.recordset.findOne((x) => x.Id === req.params.Id);
  if (customer) {
    res.send(customer);
  } else {
    res.status(404).send({ message: 'Customer not found' });
  }
});

customerRouter.get('/api/customers/:Id', async (req, res) => {
  const customer = await Product.findOne({ where: { Id: req.params.Id } });
  if (customer) {
    res.send(customer);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default customerRouter;

// app.get('/api/products', async (req, res) => {
//     console.log('connect to server');
//     const result = await getProducts();
//     res.send(result.recordset);
//   });
