import express, { response } from 'express';
import data from './data.js';
import getProducts from './dbfiles/dbOperations.js';
//import cros from 'çros';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

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

//const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`serve at http://localhost:${port}`);
// });

getProducts().then((res) => {
  console.log(res);
});
