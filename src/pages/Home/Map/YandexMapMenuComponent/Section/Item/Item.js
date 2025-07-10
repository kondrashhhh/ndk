import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './Item.module.scss';

export const Item = ({ subItem, onPlaceChange, categoryChecked }) => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (!categoryChecked) {
      setChecked(false);
    } else {
      setChecked(true); 
    }
  }, [categoryChecked]);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onPlaceChange(subItem.id, isChecked);
  };

  return (
    <li className={styles.item}>
      <div className={cn(styles.itemWrap, styles.between)}>
        <div className={styles.subItemWrap}>
          <img
            src={subItem.icon.startsWith('/local') 
              ? `https://ngk-dev.tmweb.ru${subItem.icon}`
              : subItem.icon}
            alt={subItem.label} 
          />
          <label htmlFor={subItem.id} className={styles.sublistLabel}>
            {subItem.label}
          </label>
        </div>
        <input
          className={cn(styles.placeCheckbox, styles.checkbox)}
          type="checkbox"
          id={subItem.id}
          name={subItem.id}
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </li>
  );
};