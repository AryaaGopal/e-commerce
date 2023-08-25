import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
export default function LastPage({ userdata }) {

  const { dispatch } = CartState();


  return (
    <div style={{ paddingLeft: "475px", paddingTop: '20px' }}>
      <Card style={{ width: '18rem' }}>

        <Card.Body>

          <Card.Text>
            Thank You!!!!!{userdata.Name}
          </Card.Text>
          <Link to="/home"><Button variant="primary" onClick={() =>
            dispatch({
              type: "RESET_CART",

            })
          }>Back Home</Button></Link>

        </Card.Body>
      </Card>
    </div>
  )
}


