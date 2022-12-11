import express, { response } from 'express';
import data from './data.js';
import getProducts from './dbfiles/dbOperations.js';
//import getProducts from './dbfiles/dbOperations.js';
import product from './dbfiles/productCart.js';
//import { createCart } from './dbfiles/dboperations.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/api/products', async(req, res) => {
  console.log('connect to server')
 const result = await getProducts();
 console.log('RESULT')
 console.log(result);
  res.send(result);
} ); 

app.get(`/api/products/itemId/:itemId`, (req, res) => {
  const product = data.products.find((x) => x.itemId === req.params.itemId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:itemId', (req, res) => {
  const product = data.products.find((x) => x.itemId === req.params.itemId);
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


let pr = new product(1, 'all in one');
console.log(pr);
