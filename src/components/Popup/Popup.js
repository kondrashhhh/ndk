import { AnimatePresence, motion } from 'framer-motion';
import { usePopUp } from '@/context/PopUpContext';
import styles from './Popup.module.scss';

export const Popup = ({ id, Component }) => {
    const { activePopUp, popupProps } = usePopUp();

    const transition = {
        duration: 0.8,
    };

    const isActive = activePopUp === id;

    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key={id}
                    className={styles.popup}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                >
                    <Component {...popupProps} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
