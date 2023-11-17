//ButtonAddDelete.tsx
import React from 'react';
import styles from './ButtonAddDelete.module.scss';

interface ButtonProps {
    imgSrc: string,
}

export const ButtonAddDelete = ({ imgSrc }: ButtonProps) => {
    return (
        <button className={styles.body}>
            <img src={imgSrc} alt=" " />
        </button>
    )
}
