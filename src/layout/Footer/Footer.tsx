// Footer.tsx
import React from 'react';
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom';

export const Footer = () => {
    let paymentMethods = ['visacard', 'mastercard', 'google-pay', 'apple-pay', 'paypal', 'bitkoin', 'etherium'];
    return (
        <footer className={`${styles.footer_container} container`}>
            <div className={styles.footer_information}>
                <p className={styles.footer_information_copyright}>2023. Make Your Burger</p>
                <div className={styles.footer_information_link}>
                    <Link to='/'>Privacy Policy</Link>
                    <span>|</span>
                    <Link to='/'>Terms & Conditions</Link>
                </div>
            </div>
            <div className={styles.footer_payment}>
                {paymentMethods.map((method, index) => (
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svg/footer-${method}.svg`}
                        alt={`${method}`}
                        key={`${method}-${index}`}
                    />
                ))}
            </div>
        </footer>
    )
}
