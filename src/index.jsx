import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class MooVIVApplication extends React.Component {
  render() {
    return(
      <div className= "mooviv">
        <div>Good morning</div>
      </div>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MooVIVApplication), container);