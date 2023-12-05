// Header.tsx
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Logo from '../../components/Logo';
import Navigation from '../../components/Navigation';
import ButtonCall from '../../components/ButtonCall';
import MobileMenu from '../../components/MobileMenu';
import NumberPhone from '../../components/NumberPhone';

export const Header = () => {
    let menus = [
        {
            'name': 'Discover',
            'link': '/'
        },
        {
            'name': 'Make Your Burger',
            'link': '/make-burger'
        }
    ]

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        <header className={styles.header}>
            <div className={`${styles.header_container} container`}      >
                <nav className={styles.header_nav}>
                    <Logo />
                    <Navigation menus={menus} closeMobileMenu={closeMobileMenu} />
                </nav>

                <div className={styles.header_information}>
                    <ButtonCall />

                    <NumberPhone />
                </div>
            </div>
            <nav className={`${styles.header_mobile} container`}>
                <MobileMenu onClose={closeMobileMenu} isMobileMenuOpen={isMobileMenuOpen}>
                    <Navigation menus={menus} closeMobileMenu={closeMobileMenu} />
                </MobileMenu>
            </nav>
        </header>
    )
}
