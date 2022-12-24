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
                {/* <strong>Name:</strong> {cart.customerInfo.CsCode} -{' '} */}
                {/* <strong>Address:</strong> {customerInfo.MarketName} */}
                {/* <strong>CNIC:</strong> {cart.CsCNIC}
                <strong>NTN :</strong> {cart.CsNTNO} */}
                <strong>Address:</strong>
              </Card.Text>
              <Link to="/customer">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
