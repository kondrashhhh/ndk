import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import styles from './ArrowButtonRight.module.scss';
import ArrowIcon from '../arrow.svg';


export const ArrowButtonRight = React.forwardRef(({ className, color, href, ...props }, ref) => {
    if (href) {
		return (
			<Link
                className={cn(styles.btn, className)}
                style={{borderColor: color}}
                href={href}
				{...props}
			>
				<ArrowIcon style={{stroke: color}} />
			</Link>
		);
	} else {
		return (
			<button
                ref={ref}
                className={cn(styles.btn, className)}
                style={{borderColor: color}}
                {...props}
			>
				<ArrowIcon style={{stroke: color}} />
			</button>
		);
	}
});