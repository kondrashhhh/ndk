import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Burger } from '../Burger/Burger';
import { ContactButton } from '@/components/ContactButton/ContactButton';
import cn from 'classnames';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = ({ isMenuOpen, toggleMenu }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 680px)`});

  const items = [
    { title: 'О комплексе', url: '' },
    { title: 'Планировки', url: '' },
    { title: 'Ипотека', url: '' },
    { title: 'Отделка', url: '' },
    { title: 'Расположение', url: '' },
  ];

  const menuVariants = {
    hidden: { 
      y: -150,
      opacity: 0,
      transition: { duration: 0.4 }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth <= 680) {
        if (isMenuOpen) {
          document.body.classList.add('body-no-scroll');
        } else {
          document.body.classList.remove('body-no-scroll');
        }
      // } else {
      //   document.body.classList.remove('body-no-scroll');
      // }
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.classList.remove('body-no-scroll');
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className={cn(styles.wrapper, isMenuOpen ? styles.open : '')}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
        >
          <motion.ul className={styles.navigation}>
            {items.map((navItem, index) => (
              <motion.li
                key={index}
                className={styles.item}
              >
                <a
                 href={navItem.url}
                 className={styles.url}
                >
                  {navItem.title}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          {
            isMobile && (
                <ContactButton
                 className={styles.mobileButton}
                 background='white'
                >
                    Заказать звонок
                </ContactButton>
            )
          }
          {
            !isMobile && (
              <div className={styles.burger}>
                  <Burger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
              </div>
            )
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
};