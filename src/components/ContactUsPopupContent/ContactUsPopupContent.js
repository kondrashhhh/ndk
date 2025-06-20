import { useState, useRef } from 'react';
import { usePopUp } from '@/context/PopUpContext';
import ReactInputMask from 'react-input-mask';
import { Box } from '@/pages/Home/components/Box/Box';
import styles from './ContactUsPopupContent.module.scss';

export const ContactUsPopupContent = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { closePopUp } = usePopUp();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isChecked) {
            return;
        }
        
        closePopUp();
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.wrapper}>
            <Box className={styles.content}>
                <button 
                    className={styles.close} 
                    onClick={closePopUp}
                    aria-label="Закрыть окно"
                >
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1L25.5 26M25.5 1L0.5 26" stroke="black" strokeWidth="1.5"/>
                    </svg>
                </button>
                <h3 className={styles.title}>
                    Закажите обратный звонок и мы вам перезвоним
                </h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="Имя"
                        required
                        className={styles.input}
                    />
                    <ReactInputMask 
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Телефон"
                        required
                        className={styles.input}
                    />
                    <div className={styles.bottom}>
                        <div className={styles.policy}>
                            <label htmlFor="policy">
                                Я согласен на 
                                <a 
                                  href="https://n-gk.ru/terms-of-use/"
                                  className={styles.policyLink}
                                >
                                    обработку
                                </a>
                                моих персональных данных. 
                                С
                                <a 
                                  href="https://n-gk.ru/terms-of-use/"
                                  className={styles.policyLink}
                                >
                                    политикой
                                </a>
                                в отношении обработки персональных данных ознакомлен и согласен.
                            </label>
                            <input
                                type="checkbox"
                                id="policy"
                                name="policy"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className={styles.policyInput}
                            />
                        </div>
                        <button 
                            type="submit"
                            className={styles.submitButton}
                        >
                            Заказать
                        </button>
                    </div>
                </form>
            </Box>
        </div>
    );
};