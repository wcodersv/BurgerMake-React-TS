// BurgerPiece.tsx
import React from 'react';
import styles from './BurgerPiece.module.scss';

interface BurgerPieceProps {
    name: string;
    src: string;
    alt: string;
    width: string;
    height: string;
    position: { top: string; left: string };
    transform?: string;
}

export const BurgerPiece: React.FC<BurgerPieceProps> = ({ name, src, alt, width, height, position, transform }) => {

    const classNames = `${styles.burger} 
    ${name === 'love' ? styles.emoji_love :
            name === 'explosion' ? styles.emoji_explosion :
                name === 'holiday' ? styles.emoji_ok :
                    name === 'ok' ? styles.emoji_ok :
                        styles.burger_piece}
    `;


    return (
        <picture>
            <source
                srcSet={src}
                type="image/webp"
            />
            <img
                className={classNames}
                src={src}
                alt={alt}
                style={{ width, height, transform, ...position }}
            />
        </picture>
    );
};
