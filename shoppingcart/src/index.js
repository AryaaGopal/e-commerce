import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/Context';

const Root = () => {
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log(loggedInUser)

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return (
    <React.StrictMode>
      <Context loggedInUser={loggedInUser}>
        <App loginUser={handleLogin} />
      </Context>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

