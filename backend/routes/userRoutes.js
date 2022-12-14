import express from 'express';
import { getBookerUser } from '../dbfiles/dboperations.js';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await getBookerUser(`${req.body.code}`);

    if (user) {
      if (user.recordset[0].BookerPassword === req.body.password) {
        res.send({
          code: user.recordset[0].BookerCode,
          name: user.recordset[0].BookerName,
          token: generateToken(user.recordset),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid id or password' });
  })
);

export default userRouter;

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
