import React from 'react';
import './button-primary.style.css';

export function ButtonPrimary({ title, icon, icon_alt, ...otherProps }) {
  if (otherProps.className !== undefined) {
    otherProps.className = `button__primary ${otherProps.className}`;
  }

  return (
    <button {...otherProps}>
      {icon !== undefined && <img src={icon} width={24} height={24} alt={icon_alt} />}
      {title}
    </button>
  );
}
