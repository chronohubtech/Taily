import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Utils
import { signInUserAccount, signInWithGoogle } from '@/utils/firebase/firebase.utils.js';
// Components
import { InputField } from '@components/input-field/input-field.component.jsx';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';
import { GenericModal } from '@components/generic-modal/generic-modal.component.jsx';
// Static assets
import './login.style.css';
// import HorizontalLogo from '@assets/static/horizontal-logo.svg';
import Warning from '@assets/static/warning.png';
import GoogleIcon from '@assets/icons/google-icon.svg';
import PartyPopper from '@assets/static/party-popper.png';
// Contexts
import { UserContext } from '@/contexts/user.context.jsx';

function LoginAccountRoute() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.title = 'Login Account - Taily';
  }, []);

  const defaultSignInField = {
    email: '',
    password: ''
  };

  const [signInFormFields, setSignInFormFields] = useState(defaultSignInField);
  const { email, password } = signInFormFields;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    image: PartyPopper,
    title: 'Account Created',
    message: 'You have successfully created an account!',
    buttonTitle: 'Continue'
  });

  const modalMessage = (messageData) => {
    setModalData({
      ...modalData,
      ...messageData
    });
    setIsModalVisible(true);
  };

  const hideModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalVisible(false);
  };

  // Sign in with Google account
  const signInWithGoogleAccount = async (event) => {
    event.preventDefault();

    await signInWithGoogle();
  };

  // Sign in with Form (Email and Password)
  const handleSubmit = (event) => {
    event.preventDefault();

    signInUserAccount(email, password).catch((error) => {
      switch (error.code) {
        case 'auth/wrong-password':
          modalMessage({
            image: Warning,
            title: 'Invalid Login',
            message: 'Please input the correct email and password'
          });
          break;

        case 'auth/user-not-found':
          modalMessage({
            image: Warning,
            title: 'Account Not Found',
            message: `Sorry, we don't know this account`
          });
          break;
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInFormFields({ ...signInFormFields, [name]: value });
  };

  const { currentUserAuth } = useContext(UserContext);
  const isUserLoggedIn = currentUserAuth !== null;

  return isUserLoggedIn ? (
    <Navigate to={'/home'} replace />
  ) : (
    <>
      <GenericModal {...modalData} isVisible={isModalVisible} onClick={hideModal} />

      <section className={'signin__section'}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={'signin__container'}>
          <img
            src={'https://taily.b-cdn.net/taily-horizontal-logo.svg'}
            width={243}
            height={93}
            alt="Taily horizontal logo"
            decoding={'async'}
            loading={'lazy'}
          />

          <h4 className={'signin__header'}>Sign in</h4>

          <form action="" className={'signin__form'} onSubmit={handleSubmit}>
            <InputField
              label={'Email'}
              type="email"
              placeholder={'parrot@gmail.com'}
              onChange={handleChange}
              name={'email'}
              value={email}
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
              <p>Remember me</p>
              <input type="checkbox" name="remember-auth" id={'remember-auth'} />
              <span className="checkbox"></span>
            </label>

            <ButtonPrimary title={'Sign in'} className={'mt-10'} />

            <p className={'input-note--signin !my-1'}>OR</p>

            <ButtonPrimary
              onClick={signInWithGoogleAccount}
              icon={GoogleIcon}
              title={'Sign in with Google'}
              className={'button__primary--white button__primary--icon'}
            />

            <p className={'input-note--signin'}>
              Not in the club yet?{' '}
              <Link to={'../create-account'}>
                <span>Create an account here.</span>
              </Link>
            </p>
          </form>
        </motion.div>
      </section>
    </>
  );
}

export default LoginAccountRoute;
