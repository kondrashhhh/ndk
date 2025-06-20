'use client'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import dynamic from 'next/dynamic'
import { Box } from '../components/Box/Box'
import { ContactButton } from '@/components/ContactButton/ContactButton'
import styles from './Animation.module.scss'

const CylinderGallery = dynamic(
  () => import('../CylinderGallery/CylinderGallery'),
  { ssr: false, loading: () => <p>Загрузка 3D...</p> }
)

export const Animation = () => {
  const isMobile = useMediaQuery({query: `(max-width: 680px)`});
  return (
    <div className={styles.wrapper}>
        <Box size='m' className={styles.box}>
            <div className={styles.row}>
                <div className={styles.firstColumn}>
                    <CylinderGallery />
                </div>
                <div className={styles.secondColumn}>
                    <div className={styles.topTitle}>
                        <h3 className={styles.title}>В 2 раза дешевле,</h3>
                        <span className={styles.subtitle}>чем в городе</span>
                    </div>
                    <div className={styles.contact}>
                        <span className={styles.contactSpan}>Жилой квартал премиум-класса <br /> с развитой инфраструктурой</span>
                        {
                            !isMobile && (
                                <ContactButton background='red'>Заказать звонок</ContactButton>
                            ) 
                        }
                    </div>
                    <div className={styles.bottomTitle}>
                        <span className={styles.subtitle}>рассрочка.</span>
                        <h3 className={styles.title}>первый взнос 10%</h3>
                    </div>
                    {
                        isMobile && (
                            <ContactButton background='red'>Заказать звонок</ContactButton>
                        ) 
                    }
                </div>
            </div>
        </Box>
    </div>
  )
}
