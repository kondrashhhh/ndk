import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Burger } from './Burger/Burger'
import { BurgerMenu } from './BurgerMenu/BurgerMenu'
import { ContactButton } from '@/components/ContactButton/ContactButton'
import BigLogo from './logo.svg'
import SmallLogo from './mobile_logo.svg'
import Phone from '../../../../public/phone.svg'
import styles from './Header.module.scss'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSmall = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logo}>
                {
                    isSmall ? 
                    (
                        <SmallLogo />
                    ) 
                            :
                    (
                        <BigLogo />
                    )
                }
                <div className={styles.line}></div>
                <span className={styles.logoSpan}>Жк уютный</span>
            </div>
            <div className={styles.contact}>
                {
                    isMobile ?
                    (
                        <a className={styles.mobilePhone} href="tel:+78123097777">
                            <Phone />
                        </a>
                    )
                             :
                    (
                        <>
                            <ContactButton background='white'>Заказать звонок</ContactButton>
                            <a className={styles.phone} href="tel:+78123097777">+7 812 309-77-77</a>
                        </>
                    )
                }
            </div>
            <div className={styles.burger}>
                <Burger isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </div>
        </div>
        <div className={styles.burgerMenu}>
            <BurgerMenu isMenuOpen={isMobileMenuOpen} />
        </div>
    </header>
  )
}
