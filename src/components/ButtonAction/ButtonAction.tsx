// ButtonAction.tsx
import React from 'react';
import styles from './ButtonAction.module.scss';


interface ButtonActionProps {
    text: string,
    backgroundColorBtn: string,
    colorText: string,
    widthBtn?: string,
    handle: () => void,
}

export const ButtonAction = ({ text, backgroundColorBtn, colorText, widthBtn, handle }: ButtonActionProps) => {
    return (
        <button
            onClick={() => handle()}
            className={styles.button}
            style={{ background: backgroundColorBtn, color: colorText, width: widthBtn }}
        >{text}
        </button>
    )
}
