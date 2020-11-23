import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return(
      <Container className='director-view'>
        <Card style={{width: '30rem'}} className='director-card'>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Born: {director.Birth}</Card.Text>
            <Card.Text>Died: {director.Death}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='button-back'>Go Back</Button>
          </Link>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};