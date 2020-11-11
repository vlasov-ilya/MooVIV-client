import React from 'react';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      mainView: null
    };
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
        <div className="back-button">
          <button onClick={() => window.open("mainView", "_self")} className="button">Back</button>
        </div>
      </div>
    );
  }
}