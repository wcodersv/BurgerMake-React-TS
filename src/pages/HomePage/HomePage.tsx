// Home.tsx
import React from 'react';
import styles from './HomePage.module.scss';
import BurgerAnimation from '../../components/BurgerAnimation';
import ButtonMakeBurger from '../../components/ButtonMakeBurger';

export const HomePage: React.FC = () => {

    return (
        <main>
            <div className={`${styles.main_container} container`}>
                <h1 className={styles.main_header}>Make Your Burger </h1>
                <p className={styles.main_mobile_description}>Parallax screen. Burger ingredients and emojis moving depending on the position of the mouse pointer.</p>

                <div className={styles.main_discover}>
                    <BurgerAnimation />
                    <div className={styles.main_btn}>
                        <ButtonMakeBurger />
                    </div>

                </div>
            </div>
        </main>
    )
}
