import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from'react-bootstrap/Form';
import { RegistrationView } from '../registration-view/registration-view';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://mooviv.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
    console.log('no user found')
    });
  };

  return(
  <div className="login-view">
    <h1>Welcome to MooVIV!</h1>
    <Form className="login-view">
      <Form.Group controleId="formBasicUsername" className="login-item">
      <Form.Label>Username: </Form.Label>
      <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" /> 
      </Form.Group>
      <Form.Group controleId="formBasicPassword" className="login-item">
      <Form.Label>Password: </Form.Label>
      <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Passport" /> 
      </Form.Group>
    </Form>
    <div className="login-buttons">
      <Button onClick={handleSubmit} variant="primary" type="submit" className="button-login">LogIn</Button> 
      <Link to={"/register"}>
        <Button variant="success" className="button-register">Join MooVIV</Button>
      </Link>
    </div>
  </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};