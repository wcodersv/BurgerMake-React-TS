//InputImg.tsx
import React from 'react';
import styles from './InputImg.module.scss';

interface InputImgProps {
    srcImg: string;
}

export const InputImg = ({ srcImg }: InputImgProps) => {
    return (
        <img
            src={srcImg}
            alt=""
            className={styles.input_icon}
        />
    )
}
