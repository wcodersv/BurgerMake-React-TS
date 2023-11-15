// Burger.tsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Burger.css';
import { ingredients } from '../../data/BurgerWhole';
import { ingredientsExplode } from '../../data/BurgerExplode';
import BurgerWhole from './BurgerWhole';


export const Burger: React.FC = () => {
    // Состояния для управления анимациями и стилями
    const [showBurger, setShowBurger] = useState(false); // Показать бургер
    const [explode, setExplode] = useState(false); // Взрыв
    const [isShaking, setShaking] = useState(false); // Дрожание

    // Эффект useEffect для запуска анимации при загрузке компонента
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowBurger(true);
            setTimeout(() => setExplode(true), 1200); // Задержка перед взрывом
        }, 500);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timeoutId);
    }, []);

    // Анимационные свойства, используя библиотеку react-spring
    const springProps = useSpring({
        opacity: showBurger ? 1 : 0,
        transform: `translateY(${showBurger ? 0 : -60}%)`,
        onRest: () => {
            if (explode) {
                // Дополнительные действия после взрыва
            } else {
                setShaking(true);
            }
        },
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
