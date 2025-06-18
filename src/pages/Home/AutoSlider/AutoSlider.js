import React from 'react'
import { Box } from '../components/Box/Box'
import styles from './AutoSlider.module.scss'

export const AutoSlider = () => {
  return (
    <div className={styles.wrapper}>
        <Box size='m'>
            <div>
              <img src='/home/autoslider/tree.png' alt="Left Tree" className={styles.leftTree}/>
              <img src='/home/autoslider/tree.png' alt="Right Tree" className={styles.rightTree}/>
              <img src='/home/autoslider/grass.png' alt="Grass" className={styles.grass}/>
              <img src='/home/autoslider/stone.png' alt="Left Stone" className={styles.leftStone}/>
              <img src='/home/autoslider/stone.png' alt="Right Stone" className={styles.rightStone}/>
            </div>
            <div className={styles.text}>
              <p>
                беспрецедентное <br/>
                <span className={styles.greenText}>озеленение</span>
              </p>
            </div>
        </Box>
    </div>
  )
}
