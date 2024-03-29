import React from 'react';
import ModalWrapper from '../ModalWrapper';
import ModalHeader from '../ModalHeader';
import styles from './ModalSuccess.module.scss';

interface ModalSuccessProps {
    toggleModal: () => void;
    data?: {
        username: string;
        phonenumber: string;
        shippingAddress: string;
        timedelivery: string;
    };
}

export const ModalSuccess = ({ toggleModal, data }: ModalSuccessProps) => {
    const { username, phonenumber, shippingAddress, timedelivery } = data || {};


    return (
        <>
            <ModalWrapper>
                <ModalHeader
                    title='Success'
                    handle={toggleModal}
                />
                <div className={styles.container}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svg/form-icon-success.svg`}
                        alt=""
                        className={styles.container_img}
                    />
                    <h2 className={styles.container_title}>Thank you for the order, <br /> {username}!</h2>


                    <div className={styles.container_info}>
                        <p>Phone Number: {phonenumber}</p>
                        <p>Shipping Address: {shippingAddress}</p>
                        <p>Time to Delivery: {timedelivery}</p>

                    </div>
                </div>
            </ModalWrapper >
        </>
    )
}
