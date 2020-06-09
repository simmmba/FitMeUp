import React, { Component, Fragment } from 'react';
import './Input.scss';

class Input extends Component {
  handleChange = (e) => {
    const { onChange } = this.props;
    onChange(e);
  };

  render() {
    const {
      id, name, value, type, placeholder, className,
    } = this.props;
    return (
      <Fragment>
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={this.handleChange}
          className={`createroom-input ${className}`}
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className='createroom-label'
        >
          {placeholder}
        </label>
      </Fragment>
    );
  }
}

export default Input;
