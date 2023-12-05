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

export const BurgerWhole = ({ ingredients = [], onImagesLoaded }: BurgerWholeProps) => {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Функция для загрузки одного изображения
        const loadImage = (src: string) => {
            return new Promise<void>((resolve) => {
                // Создаем новый элемент Image
                const image = new Image();
                // Устанавливаем путь к изображению
                image.src = src;
                // Устанавливаем обработчик события onload, который вызывается при успешной загрузке изображения
                image.onload = () => resolve();
            });
        };

        // Функция для загрузки всех изображений
        const loadImages = async () => {
            try {
                // Создаем массив промисов для каждого изображения
                const promises = ingredients.map((ingredient) => loadImage(ingredient.src));
                // Ждем, пока все промисы (загрузка изображений) будут выполнены
                await Promise.all(promises);
                // Устанавливаем состояние загрузки изображений в true
                setImagesLoaded(true);
                // Вызываем колбэк, если он был передан
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
