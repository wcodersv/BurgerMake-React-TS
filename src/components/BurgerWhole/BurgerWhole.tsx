// BurgerWhole.tsx
import React from 'react';
import styles from './BurgerWhole.module.scss';
import BurgerPiece from '../BurgerPiece';

interface BurgerWholeProps {
    ingredients?: {
        name: string,
        src: string;
        alt: string;
        width: string;
        height: string;
        top: string;
        left: string;
        transform?: string;
    }[];
}

export const BurgerWhole: React.FC<BurgerWholeProps> = ({ ingredients = [] }) => {

    return (
        <div className={styles.burger}>
            {
                ingredients.map((ingredient, index) => (
                    <BurgerPiece
                        key={index}
                        name={ingredient.name}
                        src={ingredient.src}
                        alt={ingredient.alt}
                        width={ingredient.width}
                        height={ingredient.height}
                        position={{ top: ingredient.top, left: ingredient.left }}
                        transform={ingredient.transform}
                    />
                ))
            }
        </div>
    );
};
