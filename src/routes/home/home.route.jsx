import React from 'react';
import { motion } from 'framer-motion';

import './home.style.css';
// Static assets
import MenuIcon from '@assets/icons/menu-icon.svg';

import TailyPet from '@assets/pets/taily-pet-1.png';
import TailyPetTreat from '@assets/pets/taily-pet-bone-1.png';

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

          <div className={'h-[77px] w-full my-4 flex items-center justify-center relative'}>
            <img
              src={TailyPet}
              style={{ left: '67%' }}
              className={'absolute w-[63px] h-[77px] block transition-all duration-500'}
              decoding={'async'}
              loading={'lazy'}
              alt="Taily pet"
            />

            <div className={'h-[15px] w-full bg-[#FFDCDB] block rounded-full overflow-hidden'}>
              <span
                className={'transition-all duration-500 h-[15px] bg-[#A1DCD6] block rounded-full'}
                style={{ width: '70%' }}></span>
            </div>

            <img
              src={TailyPetTreat}
              className={'absolute right-0 w-[50px] aspect-square block'}
              decoding={'async'}
              loading={'lazy'}
              alt="Taily pet treats"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomeRoute;
