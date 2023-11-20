//ButtonAddDelete.tsx
import React from 'react';
import styles from './ButtonAddDelete.module.scss';

interface ButtonProps {
    imgSrc: string,
    onClick: () => void,
}

export const ButtonAddDelete = ({ imgSrc, onClick }: ButtonProps) => {
    return (
        <button
            className={styles.body}
            onClick={onClick}
        >
            <img src={imgSrc} alt=" " />
        </button>
    )
}
