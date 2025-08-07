import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { AnimatePresence, motion } from 'framer-motion';
import styles from './TopSection.module.scss'

export const TopSection = ({ id }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const mobileSmallText = <>Комфорт <br /> в каждом метре</>;
  const desktopSmallText = <>Комфорт <br /> в каждом метре</>;

  const transition = {
    duration: 1,
    ease: [0.16, 0.77, 0.47, 0.97] 
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      x: -100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...transition,
        when: "beforeChildren",
        staggerChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 1.2 } 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  return (
    <div className={styles.container} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.firstColumn}>
          <AnimatePresence mode="wait">
            <motion.div 
              className={styles.textBlock}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className={styles.h3}
                variants={itemVariants}
                transition={{ delay: 0.3 }} 
              >
                семейный <br/> квартал, в центре <br/> Новоселья
              </motion.h3>
              <motion.span
                className={styles.span}
                variants={itemVariants}
                transition={{ delay: 0.5 }}
              >
                {
                  !isMobile ? (
                    desktopSmallText
                  )
                            :
                  (
                    mobileSmallText
                  )
                }
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className={styles.secondColumn}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.4 }} 
          >
            {[
              { title: "от 4,3 млн.₽", desc: "1 кк кв при 100% оплате" },
              { title: "ЗСД - 10 мин.", desc: "20 минут ДО ПУЛКОВО" },
              { title: "2 дет-сада и школа", desc: "ШКОЛА И ДЕТСКИЕ САДИКИ ВО ДВОРЕ" },
              { title: "Благоустройство", desc: "САМЫЙ ШИРОКИЙ ДВОР В НОВОСЕЛЬЕ. МНОГОФУНКЦИОНАЛЬНЫЕ ИГРОВЫЕ ЗОНЫ. ЛАНДШАФТНЫЙ ДИЗАЙН" },
              { title: "квартал-парк", desc: "беспрецедентное озеленение" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={styles.textItem}
                variants={itemVariants}
                transition={{ delay: 0.5 + index * 0.15 }} 
              >
                <h4 className={styles.h4}>{item.title}</h4>
                <span className={styles.smspan}>{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
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