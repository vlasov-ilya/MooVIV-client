import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return <div className='main-view'/>;

    return(
      <div className='director-view'>
        <Card style={{width: '30rem'}} className='director-card'>
          <Card.Body>
            <Card.Title className='director-name'>{Director.Name}</Card.Title>
            <Card.Text>Born: {Director.Birth}</Card.Text>
            <Card.Text>Died: {Director.Death}</Card.Text>
            <Card.Text>Bio: {Director.Bio}</Card.Text>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='button-back'>Go Back</Button>
          </Link>
        </Card>
      </div>
    )
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  })
}