import React from 'react'
import cn from 'classnames';
import { usePopUp } from '@/context/PopUpContext';
import styles from './ContactButton.module.scss'

export const ContactButton = ({ background, className, children }) => {
  const { openPopUp } = usePopUp();

  return (
    <button
        className={cn(styles.button,
                      styles[background],
                      className)}
        onClick={() => { openPopUp("contactsPopup") }}
    >
        {children}
    </button>
  )
}
