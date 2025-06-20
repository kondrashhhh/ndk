import React from 'react'
import Arrow from './footer_arrow.svg'
import styles from './Projects.module.scss'

export const Projects = ({ children }) => {
  return (
    <a href="https://n-gk.ru/projects/">
        <button className={styles.button}>
            <span className={styles.content}>{children}</span>
            <div className={styles.arrow}>
                <Arrow />
            </div>
        </button>
    </a>
  )
}
