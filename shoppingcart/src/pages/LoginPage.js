import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import Home from './Home';
import Button from '@mui/material/Button';
import '../style/login.css';

function LoginPage({ loggin, onLogin }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [toapp, setToApp] = useState(false)
  const [state, setState] = useState({
    Name: '',
    Email: '',
    Place: '',
    PhoneNumber: '',
    Password: '',
  });
  const [gender, setGender] = useState('');
  const [users, setUsers] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [FormLoginErrors, setFormLoginErrors] = useState({});
  const newUserReg = () => {
    setShowLoginForm(false)
  }

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };
  const ValidateLoginForm = () => {
    let loginErrors = {};
    let Valid = true;

    // Check if required fields are empty
    if (!loginEmail.trim()) {
      loginErrors.Email = 'email is required';
      Valid = false;
    }
    if (!loginPassword.trim()) {
      loginErrors.Password = 'password is required';
      Valid = false;

    }
    else if (loginPassword.length < 6) {
      loginErrors.Password = 'Password must be at least 6 characters';
      Valid = false;
    }
    setFormLoginErrors(loginErrors);
    return Valid;

  };

  const ValidateForm = () => {
    let errors = {};
    let isValid = true;

    // Check if required fields are empty
    if (!state.Name.trim()) {
      errors.Name = 'Name is required';
      isValid = false;
      console.log("no name")
    }
    else if (!state.Name.match(/^[A-Za-z]+$/)) {
      errors.Name = 'Please enter only alphabets';
      isValid = false;
      console.log("no name")
    }
    if (!state.Email.trim()) {
      errors.Email = 'Email is required';
      isValid = false;
      console.log("no email")
    }
    if (!state.PhoneNumber.trim()) {
      errors.PhoneNumber = 'Phone Number is required';
      isValid = false;
      console.log("no phone")
    }
    else if (!state.PhoneNumber.match(/^[0-9]+$/)) {
      errors.PhoneNumber = 'Please enter only numbers';
      isValid = false;
    }
    if (!state.Place.trim()) {
      errors.Place = 'Place is required';
      isValid = false;
      console.log("no place")
    }

    if (!gender.trim()) {
      errors.Gender = 'Gender is required';
      isValid = false;
      console.log("no gender")
    }
    if (!state.Password.trim()) {
      errors.Password = 'password is required';
      isValid = false;
      console.log("no paass")
    }
    else if (state.Password.length < 6) {
      errors.Password = 'Password must be at least 6 characters';
      isValid = false;
    }
    setFormErrors(errors);
    console.log(isValid)
    return isValid;
  };
  const handleSubmit = (e) => {
    console.log("submitted")
    e.preventDefault();
    if (ValidateForm()) {
      console.log("validated")

      setShowLoginForm(true);

      const newUser = { ...state, Gender: gender };
      setUsers([...users, newUser]);
      setState({
        Name: '',
        Email: '',
        Place: '',
        PhoneNumber: '',
        Password: ''
      });
      setGender('');
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      alert('Registration completed');
    };
  }
  const handleLogout = () => {
    setLoggedInUser(null);
    setToApp(false);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (ValidateLoginForm()) {

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = storedUsers.find(
        (user) => user.Email === loginEmail && user.Password === loginPassword
      );

      if (foundUser) {
        onLogin(foundUser);
        setLoggedInUser(foundUser);
        setLoginEmail('');
        setLoginPassword('');
        setLoginError('');
        setToApp(true)

      } else {
        setLoginError('Invalid email or password');
        setShowLoginForm(true);
        alert('Invalid login credentials');
        setLoginEmail('');
        setLoginPassword('');
        setToApp(false)
      }
    };
  }
  loggin(toapp);
  if (loggedInUser) {
    return (
      <div >
        <div className='log-div'>
          <h1 style={{ fontFamily: 'Arial' }}>
            Welcome, {loggedInUser.Name}
            <AiOutlineLogout
              onClick={handleLogout} style={{ cursor: 'pointer', paddingLeft: '2px' }}
            ></AiOutlineLogout>
          </h1>
        </div>
        <Home loggedInUser={loggedInUser} />
        <div className="form-container">
        </div>
      </div>
    );
  } else if (showLoginForm) {
    return (
      <div style={{ paddingTop: "100px" }}>
        <div className="form-container" >
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>

            <label className="form-label">
              Email:
              <input type="email" name="Email" onChange={handleLoginEmailChange}
                value={loginEmail} />
              {FormLoginErrors.Email && <span className="error-message">{FormLoginErrors.Email}</span>}
            </label>
            <label className="form-label">
              Password:
              <input type="password" name="Password"
                onChange={handleLoginPasswordChange}
                value={loginPassword}
              />
              {FormLoginErrors.Password && <span className="error-message">{FormLoginErrors.Password}</span>}

            </label>
            <div className="form-row">

              <Button type="submit" className="form-button" variant="contained">
                Login
              </Button>
              <Button onClick={newUserReg} type="submit" className="form-button" variant="contained">
                Not a User
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-container">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">
              Name:
              <input type="text" name="Name" onChange={handleInputChange} className="form-input" />
              {formErrors.Name && <span className="error-message">{formErrors.Name}</span>}
            </label>

          </div>
          <div className="form-row">
            <label className="form-label">
              Place:
              <select name="Place" onChange={handleInputChange} className="form-input">
                <option value="">Select a place</option>
                <option value="Option 1">Kochi</option>
                <option value="Option 2">TVM</option>
                <option value="Option 3">Kottayam</option>
              </select>
              {formErrors.Place && <span className="error-message">{formErrors.Place}</span>}
            </label>
          </div>
          <div className="form-row">
            <label className="form-label">
              Select gender:
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="Gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                    className="radio-input"
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="Gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                    className="radio-input"
                  />
                  Female
                </label>
              </div>
              {formErrors.Gender && <span className="error-message">{formErrors.Gender}</span>}
            </label>
          </div>
          <div className="form-row">
            <label className="form-label">
              Phone Number:
              <input type="text" name="PhoneNumber" onChange={handleInputChange} className="form-input" />
            </label>
            {formErrors.PhoneNumber && <span className="error-message">{formErrors.PhoneNumber}</span>}
          </div>
          <div className="form-row">
            <label className="form-label">
              Email:
              <input type="email" name="Email" onChange={handleInputChange} className="form-input" />
              {formErrors.Email && <span className="error-message">{formErrors.Email}</span>}
            </label>
          </div>
          <div className="form-row">
            <label className="form-label">
              Password:
              <input type="password" name="Password" onChange={handleInputChange} className="form-input" />
              {formErrors.Password && <span className="error-message">{formErrors.Password}</span>}
            </label>
          </div>
          <div className="form-row">
            <Button type="submit" className="form-button" variant='contained'>Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
