import React from 'react';
import { motion } from 'framer-motion';

import './home.style.css';

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
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomeRoute;
