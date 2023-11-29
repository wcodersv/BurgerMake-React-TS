import React from 'react';
import styles from './ModalWrapper.module.scss';

interface ModalWrapperProps {
    children: React.ReactNode;
}

export const ModalWrapper = ({ children }: ModalWrapperProps) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_container}>
                {children}
            </div>
        </div>
    )
}
