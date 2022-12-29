import express from 'express';
import Product from '../models/productModel.js';
import { getProducts } from '../dbfiles/dboperations.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await getProducts();
  res.send(products.recordset);
});

productRouter.get(`/Id/:Id`, async (req, res) => {
  //const product = Product.findOne(x) => x.Id === req.params.Id);
  const products = await getProducts();
  // const product = await products.recordset.findOne({ where: { Id: req.params.Id } });
  const product = products.recordset.findOne((x) => x.Id === req.params.Id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.get('/api/product/:Id', async (req, res) => {
  const product = await Product.findOne({ where: { Id: req.params.Id } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default productRouter;
