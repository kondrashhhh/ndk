import React from 'react';
import { menuContent } from './menuContent';
import { Section } from './Section/Section';
import styles from './YandexMapMenuComponent.module.scss';

export const YandexMapMenuComponent = ({ onPlaceChange, onCategoryChange }) => {
  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <div id="inf-dd" className={styles.dd}>
          Инфраструктура района
          <ul className={styles.dropdown}>
            {menuContent.map((item) => (
              <Section 
                key={item.id}
                item={item} 
                onPlaceChange={onPlaceChange}
                onCategoryChange={onCategoryChange}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};