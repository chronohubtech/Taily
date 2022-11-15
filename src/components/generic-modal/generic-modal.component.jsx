import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';

import './generic-modal.style.css';

export function GenericModal({ image, title, buttonTitle, message, isVisible, ...buttonProps }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={'modal__overlay'}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.4 }}
            className={'modal__container'}>
            <div className={'modal__image'}>
              <img src={image} width={49} height={49} alt="Party popper" />
            </div>

            <div className={'modal__content'}>
              <h3>{title}</h3>
              <p>{message}</p>
            </div>

            <ButtonPrimary title={buttonTitle} className={'mt-7'} {...buttonProps} />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
