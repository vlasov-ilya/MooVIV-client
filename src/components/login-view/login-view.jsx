import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://mooviv.herokuapp.com/login`, {
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
  <Container className="login-view">
    <h1>Welcome to MooVIV!</h1>
    <Form >
      <Form.Group controlId="formBasicUsername" className="login-item">
      <Form.Label >Username: </Form.Label>
      <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" /> 
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="login-item">
      <Form.Label>Password: </Form.Label>
      <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Passport" /> 
      </Form.Group>
    
    <div className="login-buttons">
      <Button variant="success" onClick={handleSubmit} variant="primary" type="submit" className="button-login">LogIn</Button> 
      <Link to={`/register`}>
        <Button variant="success" className="button-register">Join MooVIV</Button>
      </Link>
    </div>
    </Form>
  </Container>
  );
}

