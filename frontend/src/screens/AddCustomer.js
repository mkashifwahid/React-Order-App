import React from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';

export default function AddCustomer() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <titl>Add Customer</titl>
      </Helmet>
      <h1>Customer Information</h1>
      <Form onSubmit={submitHandler}>
        <div>
          <Button variat="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
