import React from 'react';
import styles from './TotalAmount.module.scss';
import ButtonAction from '../ButtonAction';

interface TotalAmountProps {
    price: number,
    toggleModal: () => void
}

export const TotalAmount = ({ price, toggleModal }: TotalAmountProps) => {
    return (
        <div className={styles.total}>
            <div className={styles.total_container}>
                <p className={styles.total_container__price}>{`$${price.toFixed(2)}`}</p>

                <ButtonAction
                    text='Checkout'
                    backgroundColorBtn='var(--clr-primary)'
                    colorText='var(--clr-titan-white)'
                    widthBtn='12rem'
                    handle={toggleModal}
                />
            </div>
            <p
                className={styles.total_description}
            >
                Build a <span>$10</span> Burger and Get a Gift
            </p>
        </div>
    )
}
