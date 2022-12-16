import express from 'express';
import Product from '../models/productModel.js';
import getProducts from '../dbfiles/dbOperations.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  //await Product.remove({});
  const result = await getProducts();
  console.log(result);
  res.send({ result });
});

export default seedRouter;
