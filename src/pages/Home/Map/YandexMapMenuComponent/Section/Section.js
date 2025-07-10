import React, { useState } from 'react';
import cn from 'classnames';
import { Item } from './Item/Item';
import styles from './Section.module.scss';

export const Section = ({ item, onPlaceChange, onCategoryChange }) => {
  const [checked, setChecked] = useState(true);

  const handleCategoryChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onCategoryChange(item.id, isChecked); 
  };

  return (
    <li className={styles.item}>
      <div className={styles.itemWrap}>
        <label htmlFor={item.id}>{item.label}</label>
        <input
          className={cn(styles.categoryCheckbox, styles.checkbox)}
          type="checkbox"
          id={item.id}
          name={item.id}
          checked={checked}
          onChange={handleCategoryChange}
        />
      </div>
      <ul className={styles.sublist}>
        {item.places.map((subItem) => (
          <Item 
            key={subItem.id}
            subItem={subItem} 
            onPlaceChange={onPlaceChange}
            categoryChecked={checked}
          />
        ))}
      </ul>
    </li>
  );
};
