import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { useContext, useState } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [itemQuantity, setQuantity] = useState(0);
  const addToCartHandler = async (item) => {
    //console.log(this.quantity);
    const existItem = cartItems.find((x) => x.Id === product.Id);
    const quantity = existItem
      ? Number(existItem.quantity) + Number(itemQuantity)
      : itemQuantity;
    //const {data} = await axios.get(`/api/products/${item.itemId}`)
    if (itemQuantity > 0) {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Link to={`/product/${product.Id}`}>
          <Card.Title>{product.ItemDesc}</Card.Title>
        </Link>
        <Row>
          <Card.Text>Price : {product.ItemRate}</Card.Text>
        </Row>
        <Row>
          <Card.Text>Disc % : {product.ItemDisc} %</Card.Text>
        </Row>
        <Row>
          <Card.Text>S.Tax : {product.ItemSTax}</Card.Text>
        </Row>
        <Row>
          <Col md={3}>
            <Button
              variant="light"
              disabled={itemQuantity < 1}
              onClick={() => setQuantity(itemQuantity - 1)}
            >
              <i className="fas fa-minus-circle"></i>
            </Button>{' '}
            {/* <InputGroup className="mb-3">
              <InputGroup.Text></InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
            </InputGroup> */}
            <input
              type="number"
              onFocus={(e) => e.target.select()}
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
            {/* <span>{item.quantity}</span>{' '} */}
            <Button
              variant="light"
              onClick={() => setQuantity(Number(itemQuantity) + 1)}
            >
              <i className="fas fa-plus-circle"></i>
            </Button>
          </Col>
        </Row>
        <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
