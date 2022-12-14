import React from 'react';
import { motion } from 'framer-motion';
import './home.style.css';
// Components
import { ProgressBar } from '@components/progress-bar/progress-bar.component.jsx';
// Static assets
import TailyPet from '@assets/pets/taily-pet-1.png';
import TailyPetTreat from '@assets/pets/taily-pet-bone-1.png';
import MenuIcon from '@assets/icons/menu-icon.svg';

function HomeRoute() {
  return (
    <div>
      <section className={'home__section'}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={'home__container'}>
          <div className={'home__header'}>
            <div className={'home__title'}>
              <h3>Tasks</h3>
              <p>Tuesday, November 8</p>
            </div>

            <button className={'home__menu-button'}>
              <img src={MenuIcon} width={24} height={24} decoding={'async'} alt="Menu icon" />
            </button>
          </div>

          <ProgressBar taskProgress={5} petImage={TailyPet} petTreat={TailyPetTreat} />
        </motion.div>
      </section>
    </div>
  );
}

export default HomeRoute;
