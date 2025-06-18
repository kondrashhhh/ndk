import React from 'react'
import styles from './Tab.module.scss'

export const Tab = ({ children, isActive, onClick, PreLine = false }) => {
  return (
    <button 
      className={` ${styles.button}
                   ${isActive ? styles.activeTab : ''}
                   ${PreLine ? styles.preLine : ''} `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
