import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props)

    this.Username = null,
    this.Password = null,
    this.Email = null,
    this.Birthday = null

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://mooviv.herokuapp.com/users/${userId}`, {
      headers: {Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }



  deleteUser(e) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!confirm('Do you really want to delete your account?')) return;
    
    axios.delete(`https://mooviv.herokuapp.com/users/${username}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log(res);
      this.componentDidMount();
      
      
    });
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday){
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url:
    `https://mooviv.herokuapp.com/users/${username}/`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail: this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
    .then((response) => {
      alert('Changes Saved');
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', this.state.Username);
      window.open(`/user/${username}`, '_self');
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  removeFromFavorite (movie) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://mooviv.herokuapp.com/users/${username}/Favorites/${movie}/`,{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`Movie removed from your favorites`);
      this.componentDidMount();
      // window.open('/','_self')
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { movies } = this.props;
    const { validated } = this.state;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    return (
      <Container>
        <div>
        <h2>Page of {this.state.Username}</h2>
        <Card style={{ width: '45rem'}} className="profile-view">
          <Card.Body>
            <Card.Text className='profile-text'>Username: {this.state.Username}</Card.Text>
            <Card.Text className='profile-text'>Email: {this.state.Email}</Card.Text>
            <Card.Text className='profile-text'>Birthday: {this.state.Birthday}</Card.Text>
            <Button onClick={() => this.deleteUser()} variant="danger" className='delete-button'>Delete account</Button>
            <Link to={'/'}>
              <Button className='delete-button' variant="info"> Back</Button>
            </Link>
          </Card.Body>
        </Card>
        </div>
      <Container>
        <h2 className="favorite-movies">Your Favorite Movies</h2>
        {FavoriteMoviesList.map((movie) => {
          return (
            <Card key={movie._id} style={{width: '30rem'}} className="favorite-movies">
              <Card.Img variant='top' src={movie.ImagePath}/>
              <Card.Body>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant='link' className='fav-movie'>Movie Info</Button>
                </Link >
                <Link to=''>
                  <Button onClick={() =>this.removeFromFavorite(movie._id)}>Remove Movie</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
      <Container >
        <h3>Profile updates</h3>
        <Card.Body className = "update">
          <Form noValidate validated={validated} className="update" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className = "form-lable">Username</Form.Label>
              <Form.Control type="text" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} pattern="[a-zA-Z0-9]{6,}"/>
              <Form.Control.Feedback type="invalid">Please enter username with at least 6 alphanumeric characters.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className = "form-lable">Password<span className="required">*</span></Form.Label>
              <Form.Control type="password" placeholder="Current or New Password" onChange={(e) => this.setPassword(e.target.value)} pattern=".{6,}" required/>
              <Form.Control.Feedback type="invalid">Please enter a valid password with at lest 6 characters.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className = "form-lable">Email</Form.Label>
              <Form.Control type="email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)}/>
              <Form.Control.Feedback type="invalid">Please enter a valid email address. </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label className = "form-lable">Birthday</Form.Label>
              <Form.Control type="data" placeholder="New Birthday" onChange={(e) => this.setBirthday(e.target.value)}/>
              <Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
            </Form.Group>
            <Button className="update profile-button" variant="success" type="submit" block>
              Update profile
            </Button>
          </Form>
        </Card.Body>
      </Container>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    FavoriteMovies: PropTypes.array
  })
}