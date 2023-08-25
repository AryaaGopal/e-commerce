import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../style/card.css';
import image from '../images/imagecard.jpg';
import { Link } from 'react-router-dom';

const MyCard = ({ price }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Card Number:', cardNumber);
    console.log('Card Holder:', cardHolder);
    console.log('Expiry Date:', expiryDate);
  };

  return (
    <div className='form'>
      <Card className="atm-card">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>ATM Card</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Holder</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter card holder name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Group>
            <div className='card-buttons'>
              <Link to="/last">
                <Button variant="primary" type="submit">
                  Pay {price.price}
                </Button>
              </Link>
              <Link to="/home">
                <Button variant="danger" type="button">
                  Back
                </Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyCard;
