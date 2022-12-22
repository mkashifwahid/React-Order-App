import express, { response } from 'express';
import data from './data.js';
import { getProducts } from './dbfiles/dbOperations.js';
import product from './dbfiles/productCart.js';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/ProductRoutes.js';
//import Products from './models/productModel.js';
import { DataTypes, Sequelize } from 'sequelize';
import userRouter from './routes/userRoutes.js';
import customerRouter from './routes/customerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
//app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// app.get('/api/products', async (req, res) => {
//   const products = await getProducts();
//   res.send(products.recordset);
// });

// app.get(`/api/products/Id/:Id`, async (req, res) => {
//   console.log('ye ');
//   const result = await getProducts();
//   const product = result.recordset.find((x) => x.Id === req.params.Id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });

// app.get('/api/products/:Id', async (req, res) => {
//   const product = await Product.find((x) => x.Id === req.params.Id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
