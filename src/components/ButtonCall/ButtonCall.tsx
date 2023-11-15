// ButtonCall.tsx
import React, { useState } from 'react';
import styles from './ButtonCall.module.scss';
import { useSpring, animated } from 'react-spring';

export const ButtonCall = () => {
    const [isHovered, setHovered] = useState(false);

    const springProps = useSpring({
        transform: isHovered ? 'translateY(-2%) rotate(-9deg)' : 'translateY(2%) rotate(9deg)',
        config: { tension: 1000, friction: 1 },
    });

    return (
        <div
            className={styles.call}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <animated.img
                style={springProps}
                src='/assets/svg/header-call.svg'
                alt=' '
            />
            Call Me Back
        </div>
    );
};
