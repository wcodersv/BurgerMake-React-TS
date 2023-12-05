// Burger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './BurgerAnimation.css';
import { ingredients } from '../../data/BurgerWhole';
import { ingredientsExplode } from '../../data/BurgerExplode';
import BurgerWhole from '../BurgerWhole';

interface BurgerAnimationProps {
    onAnimationComplete: () => void;
}

export const BurgerAnimation = ({ onAnimationComplete }: BurgerAnimationProps) => {
    const [showBurger, setShowBurger] = useState<boolean>(false); // Показать бургер
    const [explode, setExplode] = useState<boolean>(false); // Взрыв
    const [isShaking, setShaking] = useState<boolean>(false); // Дрожание
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (imagesLoaded) {
                setShowBurger(true);
                setTimeout(() => setExplode(true), 1200);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [imagesLoaded]);

    const handleRest = () => {
        if (!explode) {
            setShaking(true);
        }
    };

    const handleImagesLoaded = () => {
        setImagesLoaded(true);
    };

    const onAnimationCompleted = () => {
        if (onAnimationComplete) {
            onAnimationComplete();
        }
    };

    // Анимационные свойства
    const springProps = useSpring({
        opacity: showBurger ? 1 : 0,
        transform: `translateY(${showBurger ? 0 : -60}%)`,
        onRest: () => {
            handleRest();
            onAnimationCompleted();
        },

    });

    return (
        <>
            {explode ? (
                <animated.div>
                    <BurgerWhole ingredients={ingredientsExplode} onImagesLoaded={handleImagesLoaded} />
                </animated.div>
            ) : (
                // Анимированный бургер, который может дрожать
                <animated.div style={springProps} className={isShaking ? 'shake' : ''}>
                    <BurgerWhole ingredients={ingredients} onImagesLoaded={handleImagesLoaded} />
                </animated.div>
            )}
        </>
    );
};
