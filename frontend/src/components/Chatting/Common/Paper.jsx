import React, { Component } from 'react';
import './Paper.scss';

class Paper extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={`room-paper ${className}`}>
        {children}
      </div>
    );
  }
}

export default Paper;
