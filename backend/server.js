import express, { response } from 'express';
import data from './data.js';
import getProducts from './dbfiles/dbOperations.js';
//import getProducts from './dbfiles/dbOperations.js';
import product from './dbfiles/productCart.js';
//import { createCart } from './dbfiles/dboperations.js';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/ProductRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/seed', seedRouter);
app.use('/api/Products', productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
