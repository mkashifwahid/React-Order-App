import express from 'express';
import Product from '../models/productModel.js';
import getProducts from '../dbfiles/dboperations.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  //await Product.remove({});
  const products = await getProducts();
  console.log(products);
  //const products = await Product.findAll();
  res.send({ products });
});

productRouter.get(`/Id/:Id`, async (req, res) => {
  //const product = Product.findOne(x) => x.Id === req.params.Id);
  const product = await Product.findOne({ where: { Id: req.params.Id } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.get('/api/products/:Id', async (req, res) => {
  const product = await Product.findOne({ where: { Id: req.params.Id } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default productRouter;

// app.get('/api/products', async (req, res) => {
//     console.log('connect to server');
//     const result = await getProducts();
//     res.send(result.recordset);
//   });
