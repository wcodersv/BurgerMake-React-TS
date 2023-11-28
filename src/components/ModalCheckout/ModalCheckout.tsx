// ModalCheckout.tsx
import React, { useState } from 'react';
import styles from './ModalCheckout.module.scss';
import ButtonAction from '../ButtonAction';
import InputForm from '../InputForm';

interface ModalCheckoutProps {
    toggleModal: () => void,
}

export const ModalCheckout = ({ toggleModal }: ModalCheckoutProps) => {
    // Состояние для ошибок формы
    const [formErrors, setFormErrors] = useState<string[]>([]);
    // Состояние для значений полей ввода
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});



    const inputList = [
        {
            name: 'Your Name',
            type: 'text',
            inputId: 'nameInput',
            imgActive: '/assets/svg/form-icon-smile-active.svg',
            imgDefault: '/assets/svg/form-icon-smile-disabled.svg',
            imgError: '/assets/svg/form-icon-smile-error.svg',
            requiredInput: false,
        },
        {
            name: 'Phone Number',
            type: 'tel',
            inputId: 'phoneNumberInput',
            imgActive: '/assets/svg/form-icon-phone-active.svg',
            imgDefault: '/assets/svg/form-icon-phone-disabled.svg',
            imgError: '/assets/svg/form-icon-phone-error.svg',
            requiredInput: true,
        },
        {
            name: 'Shipping Address',
            type: 'address',
            inputId: 'shippingAddressInput',
            imgActive: '/assets/svg/form-icon-address-active.svg',
            imgDefault: '/assets/svg/form-icon-address-disabled.svg',
            imgError: '/assets/svg/form-icon-address-error.svg',
            requiredInput: true,
        },
    ];

    // Обработчик изменения значений в полях ввода
    const handleChange = (inputId: string, value: string) => {
        setInputValues((prevValues) => ({ ...prevValues, [inputId]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Валидация формы и установка ошибок
        const errors: string[] = [];
        inputList.forEach((info) => {
            if (info.requiredInput && !inputValues[info.inputId]) {
                errors.push(`Пожалуйста, заполните поле "${info.name}"`);
            }
        });

        setFormErrors(errors);

        console.log(formErrors)
        console.log(inputValues)

        // Если ошибок нет, можно продолжить с логикой оформления заказа
        if (errors.length === 0) {
            // Добавьте свою логику обработки заказа здесь
            console.log('sucses')
            toggleModal(); // Например, закрытие модального окна после успешного оформления заказа
        }
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

                <form action="submit" className={styles.modal_form} onSubmit={handleSubmit}>
                    <div className={styles.modal_form_main}>
                        {inputList.map((info, index) => (
                            <InputForm
                                key={`${info.name}-${index}`}
                                name={info.name}
                                type={info.type}
                                imgActive={info.imgActive}
                                imgDefault={info.imgDefault}
                                inputId={info.inputId}
                                imgError={info.imgError}
                                requiredInput={info.requiredInput}
                                handleChange={(value) => handleChange(info.inputId, value)}
                                value={inputValues[info.inputId] || ''}
                            />
                        ))
                        }
                    </div>

                    
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
                            typeBtn='submit'
                            handle={() => handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
