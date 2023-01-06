import express from 'express';
import Product from '../models/productModel.js';
import {
  getProducts,
  getCategories,
  getSearchProducts,
} from '../dbfiles/dboperations.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await getProducts();
  res.send(products.recordset);
});

const PAGE_SIZE = 3;

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    console.log(query);

    // const pageSize = query.pageSize || PAGE_SIZE;
    // const pages = query.page || 1;
    const company = query.category;
    const itemName = query.query;

    // const queryFilter =
    //   searchQuery && searchQuery !== 'all'
    //     ? {
    //         name: {
    //           $regex: searchQuery,
    //           $options: 'í',
    //         },
    //       }
    //     : {};
    // const categoryFilter = category && category !== 'all' ? { category } : {};

    const products = await getSearchProducts(company, itemName);
    res.send(products.recordset);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await getCategories();
    res.send(categories.recordset);
  })
);

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
