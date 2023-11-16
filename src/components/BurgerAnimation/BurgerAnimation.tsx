// Burger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './BurgerAnimation.css';
import { ingredients } from '../../data/BurgerWhole';
import { ingredientsExplode } from '../../data/BurgerExplode';
import BurgerWhole from '../BurgerWhole';


export const BurgerAnimation: React.FC = () => {
    const [showBurger, setShowBurger] = useState(false); // Показать бургер
    const [explode, setExplode] = useState(false); // Взрыв
    const [isShaking, setShaking] = useState(false); // Дрожание

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowBurger(true);
            setTimeout(() => setExplode(true), 1200);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleRest = () => {
        if (!explode) {
            setShaking(true);
        }
    };

    // Анимационные свойства
    const springProps = useSpring({
        opacity: showBurger ? 1 : 0,
        transform: `translateY(${showBurger ? 0 : -60}%)`,
        onRest: handleRest,
    });

    return (
        <>
            {explode ? (
                <animated.div>
                    <BurgerWhole ingredients={ingredientsExplode} />
                </animated.div>
            ) : (
                // Анимированный бургер, который может дрожать
                <animated.div style={springProps} className={isShaking ? 'shake' : ''}>
                    <BurgerWhole ingredients={ingredients} />
                </animated.div>
            )}
        </>
    );
};
