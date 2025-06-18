import React from 'react'
import { Box } from '../components/Box/Box'
import { items } from './content'
import styles from './Boxes.module.scss'

export const Boxes = () => {
  return (
    <div className={styles.wrapper}>
        {
            items.map(item => (
                <Box size='m' className={styles.item}>
                    <div className={styles.absolute}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <span className={styles.subtitle}>{item.subtitle}</span>
                    </div>
                </Box>
            ))
        }
    </div>
  )
}
