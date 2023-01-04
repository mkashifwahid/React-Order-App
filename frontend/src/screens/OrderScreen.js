import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/LoadingBox';
import { Store } from '../Store';
import { getError } from '../util';
import ListGroup from 'react-bootstrap/ListGroup';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const navigate = useNavigate();
  const { id: orderId } = params;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    console.log(orderId, 'order info11');

    if (!userInfo) {
      return navigate('/login');
    }
    console.log(orderId, 'order info11');
    console.log(order, 'order info');
    console.log(order.id, 'order info idnp');
    if (!order.id || (order.id && order.id !== orderId)) {
      console.log('fetch gaya');
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {order.order[0].BknghRefNo}</title>
      </Helmet>
      <h1 className="my-3">Order {order.order[0].BknghRefNo}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Card.Text>
                  <Row>
                    <Col md={2}>
                      <strong>Name:</strong>
                    </Col>
                    <Col>{order.order[0].CsName}</Col>
                  </Row>
                </Card.Text>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.order.map((item) => (
                  <ListGroup.Item key={item.ItemCode}>
                    <Row className="align-items-center">
                      <Col md={7}>{item.ItemDesc}</Col>
                      <Col md={2}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.ItemRate}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          {/* <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>${order.itemDiscount.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col>Sales Tax</Col>
                  <Col>${order.itemSTax.toFixed(2)}</Col>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Order Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.orderTotal.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </div>
  );
}