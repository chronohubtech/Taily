import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { createUserAccount } from '@/utils/firebase/firebase.utils.js';
// Components
import { InputField } from '@components/input-field/input-field.component.jsx';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';
import { GenericModal } from '@components/generic-modal/generic-modal.component.jsx';
// Static assets
import './create-account.style.css';
import PartyPopper from '@assets/static/party-popper.png';
import HorizontalLogo from '@assets/static/horizontal-logo.svg';
import GoogleIcon from '@assets/icons/google-icon.svg';

function CreateAccountRoute() {
  useEffect(() => {
    document.title = 'Create Account - Taily';
  }, []);

  // React router navigate
  const navigate = useNavigate();

  const defaultSignUpField = {
    email: '',
    username: '',
    password: ''
  };

  const [signUpFormFields, setSignUpFormFields] = useState(defaultSignUpField);
  const { email, username, password } = signUpFormFields;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = signUpFormFields;
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    // Show modal
    setIsModalVisible(true);
    // Clear form fields
    setSignUpFormFields(defaultSignUpField);
    // Firebase Auth - email placeholder atm.
    createUserAccount(email, password).then((r) => console.log(r));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpFormFields({ ...signUpFormFields, [name]: value });
  };

  return (
    <>
      <GenericModal
        image={PartyPopper}
        isVisible={isModalVisible}
        title={'Account Created'}
        message={`You have successfully created an account!`}
        buttonTitle={'Continue'}
        onClick={() => {
          document.body.style.overflow = 'auto';
          navigate('/login');
        }}
      />

      <section className={'signup__section'}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={'signup__container'}>
          <img
            src={HorizontalLogo}
            width={180}
            height={71}
            alt="Taily horizontal logo"
            decoding={'async'}
            loading={'lazy'}
          />

          <h4 className={'signup__header'}>Create an account</h4>

          <form action="" className={'signup__form'} onSubmit={handleSubmit}>
            <InputField
              label={'Email'}
              type="email"
              placeholder={'parrot@taily.app'}
              onChange={handleChange}
              name={'email'}
              value={email}
              required
            />

            <InputField
              label={'Username'}
              type="text"
              placeholder={'parrot'}
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
              required
            />

            <ButtonPrimary title={'Create an account'} className={'mt-7'} />
            <p className={'input-note--signup !my-1'}>OR</p>
            <ButtonPrimary
              icon={GoogleIcon}
              title={'Sign up with Google'}
              className={'button__primary--white button__primary--icon'}
            />

            <p className={'input-note--signup'}>
              Joined us before?{' '}
              <Link to={'../login'}>
                <span>Login here.</span>
              </Link>
            </p>
          </form>
        </motion.div>
      </section>
    </>
  );
}

export default CreateAccountRoute;
