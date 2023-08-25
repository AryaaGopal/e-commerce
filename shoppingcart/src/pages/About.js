import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{paddingLeft:'550px',paddingTop:'100px'}} >    
    <Card style={{ width: '18rem' }}>

    <Card.Body>
      <Card.Title>Our Shopping Cart: Your Gateway to Seamless Shopping</Card.Title>
      <Card.Text>
           Welcome to our online store, where a world of shopping convenience and excitement awaits you. At the heart of your shopping experience lies our robust and intuitive shopping cart feature
      </Card.Text>
     <Link to="/login" ><Button variant="primary">Go to login</Button></Link>
     <Link to="/contact" > <Button variant="primary">Contact US</Button>
     </Link>
    </Card.Body>
  </Card>
</div>
  )
}  
    