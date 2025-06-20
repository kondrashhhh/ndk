import React from 'react';
import { Box } from '../components/Box/Box';
import { YandexMapComponent } from './YandexMapComponent/YandexMapComponent';
import styles from './Map.module.scss';

export const Map = () => {
  return (
    <div className={styles.wrapper}>
      <Box size='m' className={styles.box}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Расположение и инфраструктура</h3>
        </div>
        <YandexMapComponent />
      </Box>
    </div>
  );
};