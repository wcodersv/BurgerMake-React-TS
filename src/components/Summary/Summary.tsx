import React from 'react';
import styles from './Summary.module.scss';
import ButtonAction from '../ButtonAction';

interface summaryProps {
    time: number,
    weight: number,
    kcal: number,
    price: number,
    toggleModal: () => void
}

export const Summary = ({ time, weight, kcal, price, toggleModal }: summaryProps) => {

    const detailsFood = [
        {
            'name': 'time',
            'src': '/assets/svg/summary-clock.svg',
            'content': `${time} min`,
            'color': 'var(--clr-heliotrope)',
            'img': {
                'width': '1rem',
                'height': '1rem',
            }
        },
        {
            'name': 'weight',
            'src': '/assets/svg/summary-scale.svg',
            'content': `${weight.toFixed(1)} oz`,
            'color': 'var( --clr-tan-hide)',
            'img': {
                'width': '1rem',
                'height': '1rem',
            }
        },
        {
            'name': 'kcal',
            'src': '/assets/svg/summary-fire.svg',
            'content': `${kcal} kcal`,
            'color': 'var(--clr-danger)',
            'img': {
                'width': '1.375rem',
                'height': '1.375rem',
            }
        }
    ]

    return (
        <div className={styles.summary}>
            <h2 className={styles.summary_header}>Summary</h2>
            <span className={styles.line} />

            <div className={styles.summary_total}>
                <div className={styles.summary_total_container}>
                    <p className={styles.summary_total_container__price}>{`$${price.toFixed(2)}`}</p>

                    <ButtonAction
                        text='Checkout'
                        backgroundColorBtn='var(--clr-primary)'
                        colorText='var(--clr-titan-white)'
                        widthBtn='12rem'
                        handle={toggleModal}
                    />
                </div>
                <p
                    className={styles.summary_total_description}
                >
                    Build a <span>$10</span> Burger and Get a Gift
                </p>
            </div>

            <div className={styles.summary_details}>
                {detailsFood.map((detail, index) => (
                    <div
                        key={`${detail.name}-${index}`}
                        className={styles.summary_details_information}
                    >
                        <div
                            className={styles.summary_details_information__img}
                            style={{ backgroundColor: detail.color }}
                        >
                            <img
                                src={detail.src}
                                alt={detail.name}
                                style={{ width: detail.img.width, height: detail.img.height }}
                            />
                        </div>

                        <p>{detail.content}</p>
                    </div>
                ))}

            </div>

        </div>
    )
}
