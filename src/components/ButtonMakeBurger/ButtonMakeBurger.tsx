// ButtonMakeBurger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import styles from './ButtonMakeBurger.module.scss';

export const ButtonMakeBurger = () => {
    const [showButton, setShowButton] = useState(false);
    const [isAnimating, isAnimatingButton] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowButton(true);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        // Проверяем, что кнопка появилась, прежде чем начать анимацию
        if (showButton) {
            const intervalId = setInterval(() => {
                isAnimatingButton((prevIsHovered) => !prevIsHovered);
            }, 1500);
            
            return () => clearInterval(intervalId);
        }
    }, [showButton]);



    // Анимационные свойства для реакции на изменения showButton
    const springProps = useSpring({
        opacity: showButton ? 1 : 0,
        transform: showButton ? 'scale(1)' : 'scale(0)',
        config: { duration: 90 },
    });

    // Анимационные свойства чтобы срабатовало каждую секунду
    const isAnimatingProps = useSpring({
        transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
        config: { mass: 4, stiffness: 600, damping: 15 },
        borderRadius: isAnimating ? '20rem' : '10rem',
        background: isAnimating ? 'var(--clr-indigo-600)' : 'var(--clr-primary)',

    });


    return (
        <animated.div
            style={{ ...springProps, ...isAnimatingProps }}
            className={styles.btn}
        >
            <Link to='/make-burger'>make <br />burger</Link>
        </animated.div>
    );
}
