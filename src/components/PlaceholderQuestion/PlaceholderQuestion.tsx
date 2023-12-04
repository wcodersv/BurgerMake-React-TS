import React from 'react';
import styles from './PlaceholderQuestion.module.scss';

export const PlaceholderQuestion = () => {
    return (
        <div className={styles.placeholder}>
            <img src={`${process.env.PUBLIC_URL}/assets/svg/icon-emoji-boom.svg`} alt=" " className={styles.placeholder__img} />
            <p className={styles.placeholder__content}>You are sure?</p>
        </div>
    )
}
