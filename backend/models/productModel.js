import { Sequelize, Model, DataTypes } from 'sequelize';
// import product from '../dbfiles/productCart';
const sequelize = new Sequelize('sqlite::memory:');

const ProductSchema = sequelize.define(
  'Products',
  {
    Id: DataTypes.STRING,
    ItemCode: DataTypes.STRING,
    ItemDesc: DataTypes.STRING,
    ItemUnit: DataTypes.STRING,
    ItemRate: DataTypes.DECIMAL,
    ItemDisc: DataTypes.DECIMAL,
    ItemSTax: DataTypes.DECIMAL,
    Grp_Desc: DataTypes.STRING,
    Cmp_Name: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

const Products = sequelize.model('Products', ProductSchema);

export default Products;

//const Product = new Model('Product', ProductSchema);
// const User = sequelize.define('User', {
//   username: DataTypes.STRING,
//   birthday: DataTypes.DATE,
// });

// const sequelize = new Sequelize('sqlite::memory:', {
//   // Choose one of the logging options
//   logging: console.log,                  // Default, displays the first parameter of the log function call
//   logging: (...msg) => console.log(msg), // Displays all log function call parameters
//   logging: false,                        // Disables logging
//   logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
//   logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
// });
