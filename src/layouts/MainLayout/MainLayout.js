import React from 'react'
import { Popup } from '@/components/Popup/Popup';
import { ContactUsPopupContent } from '@/components/ContactUsPopupContent/ContactUsPopupContent';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './MainLayout.module.scss'

export const MainLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div className={styles.content}>
				{children}
			</div>
			<Footer />
			<Popup id="contactsPopup" Component={ContactUsPopupContent} />
		</>
	);
};
