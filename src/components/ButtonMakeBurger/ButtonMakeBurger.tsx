// ButtonMakeBurger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import styles from './ButtonMakeBurger.module.scss';

export const ButtonMakeBurger = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowButton(true);
        }, 2600);

        return () => clearTimeout(timeoutId);
    }, []);

    const springProps = useSpring({
        opacity: showButton ? 1 : 0,
        transform: showButton ? 'scale(1)' : 'scale(0)',
        config: { duration: 90 },
    });

    return (
        <animated.div style={springProps} className={styles.btn}>
            <Link to='/make-burger'>make <br />burger</Link>
        </animated.div>
    );
}
