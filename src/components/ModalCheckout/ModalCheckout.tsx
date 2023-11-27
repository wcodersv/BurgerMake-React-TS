// ModalCheckout.tsx
import React, { useState } from 'react';
import styles from './ModalCheckout.module.scss';
import ButtonAction from '../ButtonAction';
import InputForm from '../InputForm';

interface ModalCheckoutProps {
    toggleModal: () => void,
}

export const ModalCheckout = ({ toggleModal }: ModalCheckoutProps) => {

    const inputList = [
        {
            name: 'Your Name',
            type: 'text',
            imgActive: '/assets/svg/form-icon-smile-active.svg',
            imgDefault: '/assets/svg/form-icon-smile-disabled.svg',
        },
        {
            name: 'Phone Number',
            type: 'tel',
            imgActive: '/assets/svg/form-icon-phone-active.svg',
            imgDefault: '/assets/svg/form-icon-phone-disabled.svg',
            patternTel: '^\\+?[0-9\\s]*$',
        },
        {
            name: 'Shipping Address',
            type: 'address',
            imgActive: '/assets/svg/form-icon-address-active.svg',
            imgDefault: '/assets/svg/form-icon-address-disabled.svg',
        },
        {
            name: 'Time to Delivery',
            type: 'text',
            imgActive: '/assets/svg/form-icon-arrow-active.svg',
            imgDefault: '/assets/svg/form-icon-arrow-disabled.svg',

            options: [
                '10:00 AM',
                '11:00 AM',
                '12:00 PM',
                '1:00 PM',
                '2:00 PM',
                '3:00 PM',
                '4:00 PM',
                '5:00 PM',
                '6:00 PM',
            ],
        },
    ]



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Добавьте логику обработки формы здесь
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal_container}>
                <div className={styles.modal_header}>
                    <img src="/assets/svg/modal-icon-circle.svg" alt="" />
                    <h2 className={styles.modal_header__title}>Checkout</h2>
                    <img
                        src="/assets/svg/modal-icon-close.svg"
                        alt=""
                        className={styles.modal_header__btn}
                        onClick={toggleModal} />
                </div>

                <form action="" className={styles.modal_form} onSubmit={handleSubmit}>
                    <div className={styles.modal_form_main}>
                        {inputList.map((info, index) => (
                            <InputForm
                                key={`${info.name}-${index}`}
                                name={info.name}
                                type={info.type}
                                imgActive={info.imgActive}
                                imgDefault={info.imgDefault}
                                patternTel={info.patternTel}
                                options={info.options}
                            />
                        ))
                        }
                    </div>
                </form>

                <div className={styles.modal_footer}>
                    <ButtonAction
                        text='Cancel'
                        backgroundColorBtn='var(--clr-titan-white)'
                        colorText='var(--clr-primary)'
                        widthBtn='7.5rem'
                        handle={toggleModal}
                    />

                    <ButtonAction
                        text='Checkout'
                        backgroundColorBtn='var(--clr-primary)'
                        colorText='var(--clr-titan-white)'
                        widthBtn='7.5rem'
                        handle={toggleModal}
                    />
                </div>
            </div>
        </div>
    )
}
