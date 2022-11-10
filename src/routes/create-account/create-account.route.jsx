import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import { InputField } from '@components/input-field/input-field.component.jsx';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';
import { SuccessModal } from '@components/success-modal/success-modal.component.jsx';
// Static assets
import './create-account.style.css';
import HorizontalLogo from '@assets/static/horizontal-logo.svg';

function CreateAccountRoute() {
  // React router navigate
  const navigate = useNavigate();

  const defaultSignUpField = {
    username: '',
    password: '',
    petsName: ''
  };

  const [signUpFormFields, setSignUpFormFields] = useState(defaultSignUpField);
  const { username, password, petsName } = signUpFormFields;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    // Show modal
    setIsModalVisible(true);
    // Clear form fields
    setSignUpFormFields(defaultSignUpField);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpFormFields({ ...signUpFormFields, [name]: value });
  };

  return (
    <>
      <SuccessModal
        isVisible={isModalVisible}
        title={'Account Created'}
        message={`You have successfully created an account!`}
        buttonTitle={'Continue'}
        onClick={() => {
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
              required
            />

            <p className={'input-note mb-4'}>
              Please remember your password because we will not be able to change it due to
              encryption of your data.
            </p>

            <InputField
              label={`What is your pet's name?`}
              type="text"
              placeholder={'Ex: Parrot'}
              onChange={handleChange}
              name={'petsName'}
              value={petsName}
              required
            />

            <ButtonPrimary title={'Create an account'} className={'mt-7'} />

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
