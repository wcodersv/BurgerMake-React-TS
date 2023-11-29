import React, { useState } from 'react'
import styles from './InputWrapper.module.scss';

interface InputWrapperProps {
    children: React.ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
    hasError?: boolean;
}

export const InputWrapper = ({ children, onFocus, onBlur, hasError = false }: InputWrapperProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocus && onFocus();
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur && onBlur();
    };

    return (
        <div
            className={`${styles.input_wrapper} ${isFocused ? styles.input_focused : ''} ${hasError ? styles.input_error : ''}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
        </div>
    );
};
