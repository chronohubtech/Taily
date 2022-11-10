import React from 'react';
import './button-primary.style.css';

export function ButtonPrimary({ title, ...otherProps }) {
  if (otherProps.className !== undefined) {
    otherProps.className = `button__primary ${otherProps.className}`;
  }

  return <button {...otherProps}>{title}</button>;
}
