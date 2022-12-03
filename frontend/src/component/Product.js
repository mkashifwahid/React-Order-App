import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Card.Body>
        <Link to={`/product/${product.itemId}`}>
          <Card.Title>
            {product.itemCode}-{product.itemDesc}
          </Card.Title>
        </Link>
        <Card.Text>Rs. {product.itemTPRate}</Card.Text>
        {/* <Button onClick={addToCartHandler}>Add to Cart</Button> */}
      </Card.Body>
    </Card>
  );
}

export default Product;
