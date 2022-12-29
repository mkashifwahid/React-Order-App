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
