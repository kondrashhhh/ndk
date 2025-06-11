import cn from 'classnames';
import styles from './Box.module.scss';


export const Box = ({ children, className, size = 'l', ...props }) => (
	<div className={cn(styles.box, className, styles[`size-${size}`])} {...props}>
		{children}
	</div>
);