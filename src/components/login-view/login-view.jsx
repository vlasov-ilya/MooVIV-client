import React, { useState} from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from'react-bootstrap/Form';
import { RegistrationView } from '../registration-view/registration-view';

// import {RegistrationView} from '../registration-view/registration-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [showRegistration, toggleRegistrationScreen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    props.onLoggedIn(username);
  };

  if (showRegistration) {
    return <RegistrationView />
  }

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
      <Button variant="success" onClick={() => toggleRegistrationScreen(true)} className="button-register">Join MooVIV</Button>
      
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