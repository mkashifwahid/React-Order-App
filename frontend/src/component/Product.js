import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.Id === product.Id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const {data} = await axios.get(`/api/products/${item.itemId}`)

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Card.Body>
        <Link to={`/product/${product.Id}`}>
          <Card.Title>
            {product.Id} - {product.ItemDesc}
          </Card.Title>
        </Link>
        <Card.Text>Price : {product.ItemRate}</Card.Text>
        <Card.Text>Disc % : {product.ItemDisc} %</Card.Text>
        <Card.Text>S.Tax : {product.ItemSTax}</Card.Text>

        <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
