import express from 'express';
import Product from '../models/productModel.js';
import getProducts from '../dbfiles/dbOperations.js';

const seedRouter = express.Router();

const app = express();

// seedRouter.get('/', async (req, res) => {
//   const products = await getProducts();
//   Product.findAll().then((products) => {
//     res.json(products);
//   });
//   //res.send({ Product });
// });
app.get('/', async (req, res) => {
  const products = await getProducts();
  Product.findAll().then((products) => {
    res.json(products);
  });
  //res.send({ Product });
});

export default seedRouter;
