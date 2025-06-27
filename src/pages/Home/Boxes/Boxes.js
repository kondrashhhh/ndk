import React from 'react'
import { Box } from '../components/Box/Box'
import { items } from './content'
import styles from './Boxes.module.scss'

export const Boxes = ({ id }) => {
  return (
    <div className={styles.wrapper}id={id}>
        {
            items.map((item, index) => (
                <Box
                 size='m' 
                 className={styles.item} 
                 key={index}
                >
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
