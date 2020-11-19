import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';
import axios from 'axios';

axios.post('https://mooviv.herokuapp.com/users', {
  Username : username,
  Password: password,
  Email: email,
  Birthday: birthday
})
.then(response => {
  const data = response.data;
  console.log(data);
  window.open('/', '_self');
})
.catch(e =>{
  console.log('erroe registering user')
});


export function RegistrationView(props) {
  const [Username, setUsername] =  useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday );

    props.onLoggedIn(Username);
  };

  return (
    <div className="regitration-view">
        <h2>Register a New MooVIV User</h2>
        <Form className="Registrtion-form">
          <Form.Group controlId="formBasicUsername" className="registration-item">
            <Form.Label>Create Username: </Form.Label>
            <Form.Control type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)}/>
            <Form.Text class="text-muted">Must be alpanumberic and have minimum of 8 characters.</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="registration-item">
            <Form.Label>Create Password: </Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}/>
            <Form.Text class="text-muted">Must be alpanumberic and have 5-18 characters.</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="registration-iten">
            <Form.Label>Enter Email Adress: </Form.Label>
            <Form.Control type="text" placegolder="Email" value={Email} onChange={(e)=> setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Date of Birth: </Form.Label>
            <Form.Control type="text" placeholder="MM-DD-YYYY" value={Birthday} onChange={(e)=> setBirthday(e.target.value)}/>
          </Form.Group>
          <Button type="button" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
  )
  }

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired
  })
};