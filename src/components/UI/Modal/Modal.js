import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = (props) => (
  <div className='modal'>
    <h2>{props.header}
      <span className="close" onClick={props.close}>X</span>
    </h2>
    <div className='modalBody'>{props.children}</div>
    {props.showFooter && <div className='modalFooter'>
      <button onClick={props.footer} className='button'>{props.btnName}</button>
    </div>}
  </div>
);

Modal.propTypes = {
  header: PropTypes.string,
  close: PropTypes.func,
  showFooter: PropTypes.bool,
  btnName: PropTypes.string,
  footer: PropTypes.func
};

export default Modal;
