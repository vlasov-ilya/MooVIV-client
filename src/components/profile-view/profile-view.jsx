import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
// import Link from 'react-bootstrap/NavLink';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: []
    };
  }

  getUser(token) {
    const userID = localStorage.getItem('user');

    axios.get('https://mooviv.herokuapp.com/users/${userId}', {
      headers: {Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
        FavoriteMovies: res.data.Favorites
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  deleteUser(token) {
    const userId = localStorage.getItem('user');
    if (!confirm('Do you really want to delete your account?')) return;
    axios.delete('https://mooviv.herokuapp.com/users/${userId}/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log(res);
      this.componentDidMount();
    });
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    const { movies } = this.props;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movies) => userFavoriteMovies.includes(movie._id));

    return (
      <Container>
        <h2 className="profile-title">Page of {this.state.Username}</h2>
        <Card style={{ width: '45rem'}} className="profile-view">
          <Card.Body>
            <Card.Text className='profile-text'>Username: {this.state.Username}</Card.Text>
            <Card.Text className='profile-text'>Email: {this.state.Email}</Card.Text>
            <Card.Text className='profile-text'>Birthday: {this.state.Birthday}</Card.Text>
            <Button onClick={() => this.deleteUser()} className='delete-button'>Delete account</Button>
            <Link to={'/'}>
              <Button className='delete-button'>Back</Button>
            </Link>
          </Card.Body>
        </Card>
      <Container>
        <h2 className="favorite-movies">Your Favorite Movies</h2>
        {FavoriteMoviesList.map((movie) => {
          return (
            <Card key={movie._id} style={{width: '30rem'}} className="favorite-movies">
              <Card.Img variant='top' src={movie.ImagePath}/>
              <Card.Body>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant='link' className='fav-movie'>Movie Info</Button>
                </Link>
                  <Button variant='link' className='fav-movie' onClick={() => this.deleteFavoriteMovie(movie)}>Remove Movie</Button>
              </Card.Body>
            </Card>
          );
        })}
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