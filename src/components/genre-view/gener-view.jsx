import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card  from 'react-bootstrap/Card';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {genre} = this.props;

    if (!genre) return <div className='main-view'/>;

    return (
      <div className='genre-view'>
        <Card style={{ width: '30rem'}} className='genre-card'>
          <Card.Body>
            <Card.Title>{Genre.Name}</Card.Title>
            <Card.Body>{Genre.Description}</Card.Body>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='button-back'>Go Back</Button>
          </Link>
        </Card>
      </div>
    )
  }
}

GenreView.propTypes ={
  Genre: PropTypes.shape({
    Namw: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
}