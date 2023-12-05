// Navigation.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface Menu {
    name: string;
    link: string;
}

interface Props {
    menus: Menu[];
    closeMobileMenu: () => void;
}

export const Navigation = ({ menus, closeMobileMenu }: Props) => {
    const location = useLocation();

    const handleMenuClick = () => {
        closeMobileMenu();
    };

    return (
        <ul className={styles.nav}>
            {menus.map((menu) => (
                <NavLink
                    to={menu.link}
                    key={menu.name}
                    className={location.pathname === menu.link ? styles.nav_menu__active : styles.nav_menu__noactive}
                    onClick={handleMenuClick}
                >
                    <li>{menu.name}</li>
                </NavLink>
            ))}
        </ul>
    );
};
