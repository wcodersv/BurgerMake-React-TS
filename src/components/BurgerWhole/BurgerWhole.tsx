// BurgerWhole.tsx
import React, { useEffect, useState } from 'react';
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
    onImagesLoaded?: () => void;

}

export const BurgerWhole: React.FC<BurgerWholeProps> = ({ ingredients = [], onImagesLoaded }) => {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadImage = (src: string) => {
            return new Promise<void>((resolve) => {
                const image = new Image();
                image.src = src;
                image.onload = () => resolve();
            });
        };

        const loadImages = async () => {
            try {
                const promises = ingredients.map((ingredient) => loadImage(ingredient.src));
                await Promise.all(promises);
                setImagesLoaded(true);
                onImagesLoaded?.();
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadImages();
    }, [ingredients, onImagesLoaded]);


    return (
        <div className={styles.burger}>
            {imagesLoaded &&
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
                ))}
        </div>
    );
};
