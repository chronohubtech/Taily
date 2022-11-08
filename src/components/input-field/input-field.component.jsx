import './input-field.style.css';

export function InputField({ label, ...otherProps }) {
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
      />
    </div>
  );
}
