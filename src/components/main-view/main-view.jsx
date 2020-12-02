import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import {Navbar, Nav} from 'react-bootstrap/';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView} from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { setMovies, setUser } from '../../actions/actions';

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mooviv.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data)
      })
    .catch(function (error) {
      console.log(error);
    });
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut(user) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
    this.props.setUser(!user);
  }

  render() {
    const { movies, user } = this.props;

    if (!movies) return <Container className="main-view"/>;
    const pathMovies = `/`;
		const pathProfile = `/users/${user}`;

    return (
      <Router>
        <Container className="main-view">
          <Navbar collapseOnSelect expand="lg" className="navbar-main">
              <Navbar.Brand as={Link} to="/" className="brand-MooVIV">MooVIV!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                  <Nav.Link as={Link} to={`/users/${user}`} className="navbar-link">Profile</Nav.Link>
                <Button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out"> Log Out</Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          
            <Row>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                return movies.map(m => 
                <Col key={m._id} className="justify-content-around">
                  <MovieCard key={m._id} movie={m} />
                </Col>
                )
            }}/>
            </Row>
          
          <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <Container className="main-view"/>
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
          }}/>
          <Route exact path="/directors/:name" render={({ match}) => {
            if (!movies) return <Container className="main-view"/>
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
          }}/>
          <Route exact path="/users/:username" render={({ match}) => {
            if (!user) return <Container className="main-view"/>
            return <ProfileView user={user} movies={movies} />
          }}/>
          <Route exact path="/logout" render={() => <LoginView/>}/>



          </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user};
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    })
  ),
  user: PropTypes.string.isRequired
};