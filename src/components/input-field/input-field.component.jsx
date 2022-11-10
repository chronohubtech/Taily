import { useState } from 'react';
import './input-field.style.css';

export function InputField({ label, ...otherProps }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordVisibility = (event) => {
    event.preventDefault();

    setIsPasswordVisible(!isPasswordVisible);
  };

  const isInputTypePassword = otherProps.type === 'password';

  return (
    <div className={'input__container'}>
      <label htmlFor="username">{label}</label>
      <input
        {...otherProps}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-gramm="false"
        data-ms-editor="false"
        type={isInputTypePassword ? (isPasswordVisible ? 'text' : 'password') : otherProps.type}
      />

      {isInputTypePassword && (
        <button
          onClick={passwordVisibility}
          className={'password-toggle'}
          title={isPasswordVisible ? 'Show password' : 'Hide password'}>
          {isPasswordVisible ? '🔓' : '🔒'}
        </button>
      )}
    </div>
  );
}
