import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  console.log(user.BookerName);
  return jwt.sign(
    {
      code: user.Bookercode,
      name: user.BookerName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
