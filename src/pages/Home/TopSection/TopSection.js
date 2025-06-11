import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from './TopSection.module.scss'

export const TopSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.firstColumn}>
                <div className={styles.textBlock}>
                    <h3 className={styles.h3}>семейный <br/> квартал, в центре <br/> Новоселья</h3>
                    <span className={styles.span}>Комфорт <br /> в каждом метре</span>
                </div>
            </div>
            <div className={styles.secondColumn}>
                <div className={styles.textItem}>
                    <h4 className={styles.h4}>от 4,3 млн.₽</h4>
                    <span className={styles.smspan}>1 кк кв при 100% оплате</span>
                </div>
                <div className={styles.textItem}>
                    <h4 className={styles.h4}>ЗСД - 10 мин.</h4>
                    <span className={styles.smspan}>20 минут ДО ПУЛКОВО</span>
                </div>
                <div className={styles.textItem}>
                    <h4 className={styles.h4}>2 дет-сада и школа</h4>
                    <span className={styles.smspan}>ШКОЛА И ДЕТСКИЕ САДИКИ ВО ДВОРЕ</span>
                </div>
                <div className={styles.textItem}>
                    <h4 className={styles.h4}>Благоустройство</h4>
                    <span className={styles.smspan}>САМЫЙ ШИРОКИЙ ДВОР В НОВОСЕЛЬЕ. МНОГОФУНКЦИОНАЛЬНЫЕ ИГРОВЫЕ ЗОНЫ. ЛАНДШАФТНЫЙ ДИЗАЙН</span>
                </div>
                <div className={styles.textItem}>
                    <h4 className={styles.h4}>квартал-парк</h4>
                    <span className={styles.smspan}>беспрецедентное озеленение</span>
                </div>
            </div>
            <div className={styles.topGradient}></div>
        </div>
        {
            isMobile && (
                <div className={styles.mobile}></div>
            )
        }
        <div className={styles.bottomGradient}></div>
    </div>
  )
}
