// BurgerLayer.tsx
import React from 'react';
import styles from './BurgerLayer.module.scss';

interface BurgerLayerProps {
    name: string;
    src: string;
    alt: string;
    width: string;
    height: string;
    position: { top: string; left: string };
    transform?: string;
}

const BurgerLayer: React.FC<BurgerLayerProps> = ({ name, src, alt, width, height, position, transform }) => {

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

export default BurgerLayer;
