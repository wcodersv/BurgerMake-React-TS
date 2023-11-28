// ButtonAction.tsx
import React from 'react';
import styles from './ButtonAction.module.scss';

type ButtonType = "button" | "submit" | "reset";

interface ButtonActionProps {
    text: string,
    backgroundColorBtn: string,
    colorText: string,
    widthBtn?: string,
    handle: () => void,
    typeBtn?: ButtonType;
}

export const ButtonAction = ({ text, backgroundColorBtn, colorText, widthBtn, handle, typeBtn = "button" }: ButtonActionProps) => {
    return (
        <button
            onClick={() => handle()}
            className={styles.button}
            style={{ background: backgroundColorBtn, color: colorText, width: widthBtn }}
            type={typeBtn}
        >
            {text}
        </button>
    )
}
