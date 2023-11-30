//InputLabel.tsx
import React from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './InputLabel.module.scss';

interface InputLabelProps {
    titleLabel: string;
    idHtmlFor: string;
    isInputFocused?: boolean;
    hasError?: boolean;
    customClass?: object;
}

export const InputLabel = ({ titleLabel, idHtmlFor, isInputFocused, hasError, customClass }: InputLabelProps) => {
    const labelSpring = useSpring({
        top: isInputFocused ? '10%' : '30%',

        config: { duration: 100 },
        color: hasError ? 'var(--clr-danger)' : 'var(--clr-muted)',
    });

    return (
        <animated.label
            className={`${styles.label} ${isInputFocused ? styles.label_focused : ''}`}
            style={{ ...customClass, ...labelSpring }}

            htmlFor={idHtmlFor}
        >
            {titleLabel}
        </animated.label>
    )
}
