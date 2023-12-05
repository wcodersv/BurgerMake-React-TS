import React from 'react';
import styles from './NumberPhone.module.scss'

export const NumberPhone = () => {
    return (
        <a
            href='tel: 88004378722'
            className={styles.call__tel}
        >
            8 800 437-87-22
        </a>
    )
}
