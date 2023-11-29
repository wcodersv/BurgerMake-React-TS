import React from 'react';
import styles from './ModalHeader.module.scss';

interface ModalHeaderProps {
    title: string;
    handle: () => void;
}

export const ModalHeader = ({ title, handle }: ModalHeaderProps) => {
    return (
        <div className={styles.modal_header}>
            <img src="/assets/svg/modal-icon-circle.svg" alt="" />
            <h2 className={styles.modal_header__title}>{title}</h2>

            <img
                src="/assets/svg/modal-icon-close.svg"
                alt=""
                className={styles.modal_header__btn}
                onClick={handle}
            />
        </div>
    )
}
