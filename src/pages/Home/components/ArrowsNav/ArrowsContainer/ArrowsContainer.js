import cn from 'classnames';
import styles from './ArrowsContainer.module.scss';


export const ArrowsContainer = (({ className, children }) => (
    <div className={cn(styles.container, className)}>
        {children}
    </div>
));