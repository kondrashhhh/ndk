import { usePopUp } from '@/context/PopUpContext';
import styles from './ContactUsPopupContent.module.scss';



export const ContactUsPopupContent = () => {
    const { closePopUp } = usePopUp();

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <button className={styles.close} onClick={closePopUp}>
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1L25.5 26M25.5 1L0.5 26" stroke="black"/>
                    </svg>
                </button>
                <div className={styles.title}>
                    Свяжитесь с нами удобным для вас способом
                </div>
                <div className={styles.contacts}>
                </div>
                <address className={styles.address}>
                    Санкт‐Петербург, Лиговский пр. 232 офис 13
                </address>
            </div>
        </div>
    );
}