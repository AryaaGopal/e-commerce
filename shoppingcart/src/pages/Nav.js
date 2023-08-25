import React from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';

function Nav({ result }) {
  console.log(result)
  return (
    <div>
      <div className="nav-container">
        <nav className="nav">
          {!result && (
            <Link to="/login">
              <li>Login Here</li>
            </Link>
          )}
          {!result && (<Link to="/about">
            <li>About Us</li>
          </Link>)}
        </nav>
      </div>
    </div>
  );
}

export default Nav;
