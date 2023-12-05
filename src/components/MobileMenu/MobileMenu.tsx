import React from 'react';
import styles from './MobileMenu.module.scss';
import Logo from '../Logo';
import ButtonCall from '../ButtonCall';
import NumberPhone from '../NumberPhone';

interface MobileMenuProps {
    children: React.ReactNode;
    onClose: () => void;
    isMobileMenuOpen: boolean;
}

export const MobileMenu = ({ children, onClose, isMobileMenuOpen }: MobileMenuProps) => {


    return (
        <>
            <Logo />
            <ButtonCall />

            <div
                className={styles.menu}
                onClick={onClose}
            >
                <div className={styles.menu_wrapper}>
                    <span className={`${isMobileMenuOpen ? styles.menu_wrapper_line_open : styles.menu_wrapper_line}`}></span>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.menu_nav}>
                    <div className={styles.menu_nav_wrapper}>
                        <NumberPhone />
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
