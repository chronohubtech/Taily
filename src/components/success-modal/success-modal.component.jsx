import React from 'react';

import PartyPopper from '@assets/static/party-popper.png';
import { ButtonPrimary } from '@components/button-primary/button-primary.component.jsx';

import './success-modal.style.css';

export function SuccessModal({ title, buttonTitle, message, ...buttonProps }) {
  return (
    <section className={'modal__overlay'}>
      <div className={'modal__container'}>
        <div className={'modal__image'}>
          <img src={PartyPopper} width={49} height={49} alt="Party popper" />
        </div>

        <div className={'modal__content'}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>

        <ButtonPrimary title={buttonTitle} className={'mt-7'} {...buttonProps} />
      </div>
    </section>
  );
}
