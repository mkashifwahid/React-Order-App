import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function Customer(props) {
  console.log(props);
  const navigate = useNavigate();
  const { customer } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const [itemQuantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/customer');
    }
  }, [userInfo, navigate]);

  const addToCartHandler = async (customer) => {
    //console.log(this.quantity);
    const existItem = cartItems.find((x) => x.Id === customer.Id);
    const quantity = existItem
      ? Number(existItem.quantity) + Number(itemQuantity)
      : itemQuantity;
    //const {data} = await axios.get(`/api/products/${item.itemId}`)
    if (itemQuantity > 0) {
      ctxDispatch({
        type: 'CART_ADD_CUSTOMER',
        payload: { ...customer, quantity },
      });
    }

    ctxDispatch({
      type: 'SAVE_CUSTOMER',
      payload: {
        //        customerCode,
      },
    });
    localStorage.setItem(
      'customerInfo',
      JSON.stringify({
        // code,
      })
    );
    navigate('/checkout');
  };

  return (
    <Card>
      <Card.Body>
        <Link to={`/customer/${customer.CsCode}`}>
          <Card.Title>
            {customer.CsCode} - {customer.CsName}
          </Card.Title>
        </Link>
        {/* <Row>
          <Card.Text>Code : {customer.CsCode}</Card.Text>
        </Row>
        <Row>
          <Card.Text>Name : {customer.CsName} %</Card.Text>
        </Row> */}
        <Row>
          <Card.Text>CNIC : {customer.CsCNIC}</Card.Text>
        </Row>
        <Row>
          <Card.Text>NTNO : {customer.CsNTNO}</Card.Text>
        </Row>
        <Row>
          <Card.Text>Address : {customer.MarketName}</Card.Text>
        </Row>
        <Button onClick={() => addToCartHandler(customer)}>Link to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Customer;
