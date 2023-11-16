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
}

export const Navigation = ({ menus }: Props) => {
    const location = useLocation();

    return (
        <ul className={styles.nav}>
            {menus.map((menu) => (
                <NavLink
                    to={menu.link}
                    key={menu.name}
                    className={location.pathname === menu.link ? styles.nav_menu__active : styles.nav_menu__noactive}
                >
                    <li>{menu.name}</li>
                </NavLink>
            ))}
        </ul>
    );
};
