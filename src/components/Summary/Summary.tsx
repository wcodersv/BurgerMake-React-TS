import React from 'react';
import styles from './Summary.module.scss';
import ButtonAction from '../ButtonAction';
import TotalAmount from '../TotalAmount';

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
            'src': `${process.env.PUBLIC_URL}/assets/svg/summary-clock.svg`,
            'content': `${time} min`,
            'color': 'var(--clr-heliotrope)',
            'img': {
                'width': '1rem',
                'height': '1rem',
            }
        },
        {
            'name': 'weight',
            'src': `${process.env.PUBLIC_URL}/assets/svg/summary-scale.svg`,
            'content': `${weight.toFixed(1)} oz`,
            'color': 'var( --clr-tan-hide)',
            'img': {
                'width': '1rem',
                'height': '1rem',
            }
        },
        {
            'name': 'kcal',
            'src': `${process.env.PUBLIC_URL}/assets/svg/summary-fire.svg`,
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
                <TotalAmount
                    price={price}
                    toggleModal={toggleModal}
                />
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
