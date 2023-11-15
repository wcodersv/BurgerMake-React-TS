// Home.tsx
import React from 'react';
import styles from './HomePage.module.scss';
import Burger from '../../components/Burger';
import ButtonMakeBurger from '../../components/ButtonMakeBurger';

export const HomePage: React.FC = () => {

    return (
        <main>
            <div className={`${styles.main_container} container`}>
                <h1 className={styles.main_header}>Make <br /> Your <br /> Burger </h1>

                <div className={styles.main_discover}>
                    <Burger />

                   <ButtonMakeBurger />
                </div>
            </div>
        </main>
    )
}
