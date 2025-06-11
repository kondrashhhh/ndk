import React from 'react'
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
		</>
	);
};
