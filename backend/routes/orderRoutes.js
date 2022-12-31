import express from 'express';
import { getBookerUser } from '../dbfiles/dboperations.js';
import { generateToken, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import { addOrder } from '../dbfiles/dboperations.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await addOrder(
      `${req.body.customer}`,
      `${req.body.bookerUserId}`,
      ...req.body.orderItems
    );

    console.log(typeof order, 'hello world');
    console.log(order, 'hello world 2');
    res.status(201).send({ message: 'Order Created', order });
  })
);

export default orderRouter;

// userRouter.get('/', async (req, res) => {
//   const booker = await getBookerId();
//   res.send(booker.recordset);
// });

// userRouter.get(`/Id/:Id`, async (req, res) => {
//   //const product = Product.findOne(x) => x.Id === req.params.Id);
//   const bookers = await getBookerId();
//   // const product = await products.recordset.findOne({ where: { Id: req.params.Id } });
//   const booker = bookers.recordset.findOne((x) => x.Id === req.params.Id);
//   if (booker) {
//     res.send(booker);
//   } else {
//     res.status(404).send({ message: 'Booker not found' });
//   }
// });

// productRouter.get('/api/products/:Id', async (req, res) => {
//   const product = await Product.findOne({ where: { Id: req.params.Id } });
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });

//export default productRouter;
