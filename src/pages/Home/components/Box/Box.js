import React, { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Box.module.scss';

export const Box = forwardRef(({ children, className, size = 'l' }, ref) => (
  <div className={cn(styles.box, className, styles[`size-${size}`])} ref={ref}>
    {children}
  </div>
));