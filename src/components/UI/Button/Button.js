import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => (
  <div onClick={props.click} className={props.small ? "menuBtnMonth" : "btnMonth"}>{props.children}</div>
);

Button.propTypes = {
  click: PropTypes.func,
  small: PropTypes.bool,
};

export default Button;
