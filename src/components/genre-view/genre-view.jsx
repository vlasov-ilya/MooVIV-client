import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card  from 'react-bootstrap/Card';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Container className='genre-view'>
        <Card style={{ width: '30rem'}} className='genre-card'>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Body>{genre.Description}</Card.Body>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='button-back'>Go Back</Button>
          </Link>
        </Card>
      </Container>
    );
  }
}

GenreView.propTypes ={
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};