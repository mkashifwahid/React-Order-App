import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../component/CheckoutSteps';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { c } = state;
  console.log(cart, 1);
  console.log(cart.customerInfo, 2);
  console.log(cart.customerInfo.customer.CsCode, 3);

  // useEffect(() => {
  //   if (!cart.customerInfo) {
  //     console.log(cart.customerInfo, 'hmm');
  //     navigate('/customer');
  //   }
  // }, [cart, navigate]);

  // const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  // cart.itemsPrice = 0;
  // cart.itemsDiscount = 0;
  // cart.itemsSTax = 0;
  // round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.ItemRate, 0));

  // cart.orderTotal = cart.itemsPrice;

  const placeOrderHandler = async () => {};

  return (
    <div>
      <CheckoutSteps step1 step2>
        {' '}
      </CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Customer Information</Card.Title>
              <Card.Text>
                <Row>
                  <Col>
                    <strong>Name :</strong> {cart.customerInfo.customer.CsCode}{' '}
                    - {cart.customerInfo.customer.CsName}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Address :</strong>{' '}
                    {cart.customerInfo.customer.MarketName}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>CNIC :</strong> {cart.customerInfo.customer.CsCNIC}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>NTN :</strong> {cart.customerInfo.customer.CsNTNO}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Address :</strong>
                    {cart.customerInfo.customer.MarketName}
                  </Col>
                </Row>
              </Card.Text>
              <Link to="/customer">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item.Id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <Link to={`/product/${item.Id}`}>{item.ItemDesc}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.ItemRate}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>{cart.itemsDiscount.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>S.Tax</Col>
                    <Col>{cart.itemsSTax.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.orderTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
