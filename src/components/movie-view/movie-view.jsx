import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;


    if(!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath}/>
        <div className="movie-title">
          <span className="lable">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="lable">Desvription: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="lable">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="lable">Direcor: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="info-button">
          <Link to={'/directors/${movie.Director.Name'}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={'/genres/${movie.Genre.Name'}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="back-button">
        <Likn to={"/"}>
          <Button className="back-button">Back</Button>
        </Likn>
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