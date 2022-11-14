import React from 'react';
import './progress-bar.style.css';

const petImagePosition = (taskProgress) => {
  if (taskProgress >= 90) return 25;
  if (taskProgress >= 80) return 20;
  if (taskProgress >= 20) return 10;
  if (taskProgress >= 5) return 5;

  return 2;
};

export function ProgressBar({ taskProgress, petImage, petTreat }) {
  if (taskProgress >= 100) {
    taskProgress = 100;
  }

  return (
    <div className={'progress__container'}>
      <img
        src={petImage}
        style={{ left: taskProgress - petImagePosition(taskProgress) + '%' }}
        className={'progress__pet'}
        decoding={'async'}
        loading={'lazy'}
        alt="Taily pet"
      />

      <div className={'progress__bar'}>
        <span className={'progress'} style={{ width: taskProgress + '%' }}></span>
      </div>

      <img
        src={petTreat}
        className={'progress__treat'}
        decoding={'async'}
        loading={'lazy'}
        alt="Taily pet treats"
      />
    </div>
  );
}
