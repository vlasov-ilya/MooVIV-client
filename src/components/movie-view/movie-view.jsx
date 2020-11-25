import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addToFavorites = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://mooviv.herokuapp.com/users/${username}/Movies/${this.props.movie._id}`,{},{
      headers: { Authorization: `Bearer ${token}`}
    })
    .than( response => {
      alert(`${this.props.movie.Title} added to favorites`)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie } = this.props;


    if(!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath}/>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Direcor: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="info-button">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Link to=''>
            <Button onClick={this.addToFavorites}>Add to favorites</Button>
          </Link>
        </div>
        <div className="back-button">
        <Link to={"/"}>
          <Button className="back-button">Back</Button>
        </Link>
        </div>
      </div>
    );
  }
}

MovieView.propTypes ={
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
}