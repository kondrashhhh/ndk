import React from 'react'
import { Box } from '../components/Box/Box'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
              <Swiper
                speed={600}
                slidesPerView={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                allowTouchMove={true}
                loop={true}
              >
                <SwiperSlide>
                  <p>
                    беспрецедентное <br/>
                    <span className={styles.greenText}>озеленение</span>
                  </p>
                </SwiperSlide>
                <SwiperSlide>
                  <p>
                    беспрецедентное <br/>
                    <span className={styles.greenText}>озеленение</span>
                  </p>
                </SwiperSlide>
              </Swiper>
            </div>
        </Box>
    </div>
  )
}
