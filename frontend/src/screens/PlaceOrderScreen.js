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

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, customerInfo } = state;
  console.log(cart, 1);
  console.log(cart.customerInfo, 2);
  console.log(cart.customerInfo.customer.CsCode, 3);

  useEffect(() => {
    if (!cart.customerInfo) {
      console.log(cart.customerInfo, 'hmm');
      navigate('/customer');
    }
  }, [cart, navigate]);

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
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="">{cart.carItem.map(() => {})}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
