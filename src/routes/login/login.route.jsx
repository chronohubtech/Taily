import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { InputField } from '@components/input-field/input-field.component.jsx';
// Static assets
import './login.style.css';
import HorizontalLogo from '@assets/static/horizonal-logo.svg';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';

function LoginAccountRoute() {
  const defaultSignInField = {
    username: '',
    password: ''
  };

  const [signInFormFields, setSignInFormFields] = useState(defaultSignInField);
  const { username, password } = signInFormFields;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(signInFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInFormFields({ ...signInFormFields, [name]: value });
  };

  return (
    <>
      <section className={'signin__section'}>
        <div className={'signin__container'}>
          <img src={HorizontalLogo} width={180} height={71} alt="Taily horizontal logo" />

          <h4 className={'signin__header'}>Sign in</h4>

          <form action="" className={'signin__form'} onSubmit={handleSubmit}>
            <InputField
              label={'Username'}
              type="text"
              placeholder={'tailydo'}
              onChange={handleChange}
              name={'username'}
              value={username}
              required
            />

            <InputField
              label={'Password'}
              type="password"
              placeholder={`Your pet's secret`}
              onChange={handleChange}
              name={'password'}
              value={password}
              className={'mb-4'}
              required
            />

            <label htmlFor="remember-auth" className="signin__checkbox">
              <p>Remember me (Your login information)</p>
              <input type="checkbox" name="remember-auth" id={'remember-auth'} />
              <span className="checkbox"></span>
            </label>

            <ButtonPrimary title={'Sign in'} className={'mt-10'} />

            <p className={'input-note--signin'}>
              Not in the club yet?{' '}
              <Link to={'../create-account'}>
                <span>Create an account here.</span>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginAccountRoute;
