// Header.tsx
import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../components/Logo';
import Navigation from '../../components/Navigation';

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

    return (
        <header>
            <div
                className={`${styles.header_container} container`} >
                <nav className={styles.header_nav}>
                    <Logo />
                    <Navigation menus={menus} />
                </nav>

                <div className={styles.header_information}>
                    <div className={styles.header_information__call}>
                        <img
                            src='/assets/svg/header-call.svg'
                            alt=' '
                        />
                        <p>Call Me Back</p>
                    </div>

                    <a href='tel: 88004378722' className={styles.header_information__tel}>8 800 437-87-22</a>
                </div>
            </div>
        </header>
    )
}
