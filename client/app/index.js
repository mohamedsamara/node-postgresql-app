import React from 'react';
import ReactDOM from 'react-dom';

// Import application sass styles
import './styles/sass/style.scss';

ReactDOM.render(
  <div>
    <p>React</p>
    <img src="/images/social_icons/twitter.png" alt="" />
    <div className="test">Test</div>
  </div>,
  document.getElementById('root'),
);
