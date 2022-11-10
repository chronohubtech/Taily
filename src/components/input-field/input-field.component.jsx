import { useState } from 'react';
import './input-field.style.css';

function PasswordVisibilityToggle(props) {
  return (
    <button
      onClick={props.onClick}
      className={'password-toggle'}
      title={props.passwordVisible ? 'Show password' : 'Hide password'}>
      {props.passwordVisible ? '🔓' : '🔒'}
    </button>
  );
}

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
        <PasswordVisibilityToggle
          onClick={passwordVisibility}
          passwordVisible={isPasswordVisible}
        />
      )}
    </div>
  );
}
