import express, { response } from 'express';
import data from './data.js';
import getProducts from './dbfiles/dbOperations.js';
//import getProducts from './dbfiles/dbOperations.js';
import product from './dbfiles/productCart.js';
//import { createCart } from './dbfiles/dboperations.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/api/products', async (req, res) => {
  console.log('connect to server');
  const result = await getProducts();
  res.send(result.recordset);
});

app.get(`/api/products/Id/:Id`, async (req, res) => {
  console.log('ye ');
  const result = await getProducts();
  const product = result.recordset.find((x) => x.Id === req.params.Id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:Id', async (req, res) => {
  const result = await getProducts();
  const product = result.recordset.find((x) => x.Id === req.params.Id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
}); 
