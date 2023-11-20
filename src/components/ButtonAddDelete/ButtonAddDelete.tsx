//ButtonAddDelete.tsx
import React from 'react';
import styles from './ButtonAddDelete.module.scss';

interface ButtonProps {
    content: string,
    disabled?: boolean,
    onClick: () => void,
}

export const ButtonAddDelete = ({ content, disabled, onClick }: ButtonProps) => {
    return (
        <button
            className={styles.body}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    )
}
