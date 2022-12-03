import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../component/MessageBox';
import { Link } from 'react-router-dom';

export default function CartScreen() {
  const { state, dispatch: ctxDipatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <titl>Shopping Cart</titl>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.lenght === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.itemId}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <Link to={`/product${item.itemId}`}>{item.itemDesc}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
