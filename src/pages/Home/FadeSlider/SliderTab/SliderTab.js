import React from 'react';
import cn from 'classnames';
import styles from './SliderTab.module.scss';

export const SliderTab = ({ children, isActive = false, onClick }) => {
  return (
    <div 
      className={cn(styles.tab, { [styles.active]: isActive })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};