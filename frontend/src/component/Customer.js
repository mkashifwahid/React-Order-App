import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function Customer(props) {
  const navigate = useNavigate();
  const { customer } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  //const [custInfo, setCustInfo] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/customer');
    }
  }, [userInfo, navigate]);

  const LinkToCartHandler = async (_customer) => {
    //setCustomerCode(customer.CsCode);
    console.log(_customer.csCode);
    ctxDispatch({
      type: 'SAVE_CUSTOMER',
      //payload: { ..._customer },
    });

    //localStorage.setItem('customerInfo', JSON.stringify(customer));
    navigate('/placeorder');
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
        <Button onClick={() => LinkToCartHandler(customer)}>
          Link to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Customer;
