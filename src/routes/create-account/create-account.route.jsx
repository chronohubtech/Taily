import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Utils
import { getAdditionalUserInfo } from 'firebase/auth';
import {
  createUserAccount,
  signInWithGoogle,
  createUserDocument,
  isEmailAlreadyExist
} from '@/utils/firebase/firebase.utils.js';
// Components
import { InputField } from '@components/input-field/input-field.component.jsx';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';
import { GenericModal } from '@components/generic-modal/generic-modal.component.jsx';
// Static assets
import './create-account.style.css';
import PartyPopper from '@assets/static/party-popper.png';
import Warning from '@assets/static/warning.png';
import HorizontalLogo from '@assets/static/horizontal-logo.svg';
import GoogleIcon from '@assets/icons/google-icon.svg';

function CreateAccountRoute() {
  useEffect(() => {
    document.title = 'Create Account - Taily';
  }, []);

  const navigate = useNavigate();
  const defaultSignUpField = {
    email: '',
    username: '',
    password: ''
  };

  const [signUpFormFields, setSignUpFormFields] = useState(defaultSignUpField);
  const { email, username, password } = signUpFormFields;

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
    navigate('/login');
  };

  const signUpWithGoogleAccount = async (event) => {
    event.preventDefault();

    const response = await signInWithGoogle();
    const { isNewUser } = getAdditionalUserInfo(response);
    const { user } = response;

    if (!isNewUser) {
      modalMessage({
        title: 'Account already exists',
        message: 'You already have an account please continue.'
      });
    }

    await createUserDocument(user).then(() => {
      setIsModalVisible(true);
    });
  };

  const signUpWithEmailAndPassword = () => {
    const { email, username, password } = signUpFormFields;

    isEmailAlreadyExist(email).then((isExisting) => {
      if (isExisting) {
        modalMessage({
          image: Warning,
          title: 'Account already created',
          message: 'This email is already in our database.'
        });
      }

      createUserAccount(email, password)
        .then(({ user }) => {
          createUserDocument(user, username).then(() => {
            document.body.style.overflow = 'hidden';
            setIsModalVisible(true);
            setSignUpFormFields({ ...signUpFormFields, email: '' });
          });
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            modalMessage({
              image: Warning,
              title: 'Email already exists',
              message: 'This email already have an account please continue to login.'
            });
          }
        });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpWithEmailAndPassword();
  };

  const handleInputFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormFields({ ...signUpFormFields, [name]: value });
  };

  return (
    <>
      <GenericModal {...modalData} isVisible={isModalVisible} onClick={hideModal} />

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
              onChange={handleInputFormChange}
              name={'email'}
              value={email}
              required
            />

            <InputField
              label={'Username'}
              type="text"
              placeholder={'parrot'}
              onChange={handleInputFormChange}
              name={'username'}
              value={username}
              minLength={4}
              required
            />

            <InputField
              label={'Password'}
              type="password"
              placeholder={`Your pet's secret`}
              onChange={handleInputFormChange}
              name={'password'}
              value={password}
              minLength={12}
              required
            />

            <ButtonPrimary title={'Create an account'} className={'mt-7'} />

            <p className={'input-note--signup !my-1'}>OR</p>

            <ButtonPrimary
              onClick={signUpWithGoogleAccount}
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
