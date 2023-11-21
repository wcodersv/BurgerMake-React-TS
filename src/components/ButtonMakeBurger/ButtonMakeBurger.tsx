// ButtonMakeBurger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import styles from './ButtonMakeBurger.module.scss';

export const ButtonMakeBurger = () => {
    const [showButton, setShowButton] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowButton(true);
        }, 2600);

        return () => clearTimeout(timeoutId);
    }, []);

    // Анимационные свойства для реакции на изменения showButton
    const springProps = useSpring({
        opacity: showButton ? 1 : 0,
        transform: showButton ? 'scale(1)' : 'scale(0)',
        config: { duration: 90 },
    });

    // Анимационные свойства для реакции на hover и уход мыши
    const hoverProps = useSpring({
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        config: { mass: 4, stiffness: 600, damping: 15 },
        borderRadius: isHovered ? '20rem' : '10rem',
        background: isHovered ? 'var(--clr-indigo-600)' : 'var(--clr-primary)',

    });


    return (
        <animated.div
            style={{ ...springProps, ...hoverProps }}
            className={styles.btn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to='/make-burger'>make <br />burger</Link>
        </animated.div>
    );
}
