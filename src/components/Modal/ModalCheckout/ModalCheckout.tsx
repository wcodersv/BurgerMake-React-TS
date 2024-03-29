// ModalCheckout.tsx
import React, { useEffect, useState } from 'react';
import { DevTool } from "@hookform/devtools";
import { useForm, FieldErrors, Controller } from "react-hook-form";
import styles from './ModalCheckout.module.scss';
import ModalWrapper from '../ModalWrapper';
import ModalHeader from '../ModalHeader';
import ButtonAction from '../../ButtonAction';
import InputWrapper from '../../form/Input/InputWrapper';
import InputField from '../../form/Input/InputField';
import InputLabel from '../../form/Input/InputLabel';
import InputImg from '../../form/Input/InputImg';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import SelectField from '../../form/SelectField';
import ModalSuccess from '../ModalSuccess';
import { BurgerState } from '../../../pages/MakeBurgerPage/MakeBurgerPage';



const inputList = {
    'username': {
        imgActive: `${process.env.PUBLIC_URL}/assets/svg/form-icon-smile-active.svg`,
        imgDefault: `${process.env.PUBLIC_URL}/assets/svg/form-icon-smile-disabled.svg`,
        imgError: `${process.env.PUBLIC_URL}/assets/svg/form-icon-smile-error.svg`,
    },
    'phonenumber': {
        imgActive: `${process.env.PUBLIC_URL}/assets/svg/form-icon-phone-active.svg`,
        imgDefault: `${process.env.PUBLIC_URL}/assets/svg/form-icon-phone-disabled.svg`,
        imgError: `${process.env.PUBLIC_URL}/assets/svg/form-icon-phone-error.svg`,
    },
    'shippingAddress': {
        imgActive: `${process.env.PUBLIC_URL}/assets/svg/form-icon-address-active.svg`,
        imgDefault: `${process.env.PUBLIC_URL}/assets/svg/form-icon-address-disabled.svg`,
        imgError: `${process.env.PUBLIC_URL}/assets/svg/form-icon-address-error.svg`,
    },
};

const optionsSelectTime = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',];

interface ModalCheckoutProps {
    toggleModal: () => void;
    dataBurger: BurgerState | null;
}

export type FormValues = {
    username: string;
    phonenumber: string;
    shippingAddress: string;
    timedelivery: string;
}


export const ModalCheckout = ({ toggleModal, dataBurger }: ModalCheckoutProps) => {
    const methods = useForm<FormValues>({
        defaultValues: {
            username: '',
            phonenumber: '',
            shippingAddress: '',
            timedelivery: '',
        },
        mode: 'onTouched',
        criteriaMode: 'all',
    });

    const { register, reset, control, handleSubmit, formState, getValues } = methods;
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

    const [inputFocus, setInputFocus] = useState<string | null>(null);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState<FormValues>({ username: '', phonenumber: '', shippingAddress: '', timedelivery: '' });


    const handleInputFocus = (inputName: string) => {
        setInputFocus(inputName);
    };

    const handleInputBlur = () => {
        setInputFocus(null);
    };

    const onSubmitForm = (data: FormValues) => {
        console.log(data, dataBurger)
        setFormData(data);
        setFormSubmitted(true);
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log('Form errors', errors)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setFormSubmitted(true);
        }
    }, [isSubmitSuccessful, reset])


    return (
        <ModalWrapper >
            <ModalHeader title='Checkout' handle={toggleModal} />
            <form
                onSubmit={handleSubmit(onSubmitForm, onError)}
                className={styles.modal_form}
                noValidate
            >
                <div className={styles.modal_form_main}>
                    {/* firstName */}
                    <InputWrapper
                        onFocus={() => handleInputFocus('username')}
                        onBlur={handleInputBlur}
                        hasError={errors.username ? true : false}
                    >
                        <InputImg
                            srcImg={
                                errors.username
                                    ? inputList.username.imgError
                                    : inputFocus === 'username'
                                        ? inputList.username.imgActive
                                        : inputList.username.imgDefault
                            }
                        />
                        <InputField
                            label="username"
                            register={register}
                            required='Required field'
                            maxLengthInput={100}
                            idHtmlFor='usernameinput'
                            isInputFocused={inputFocus === 'username' || !!getValues('username')}

                        />

                        <InputLabel
                            titleLabel='Your Name'
                            idHtmlFor='usernameinput'
                            isInputFocused={inputFocus === 'username' || !!getValues('username')}
                            hasError={errors.username ? true : false}
                        />
                        <p className={styles.modal_error}>{errors.username?.message}</p>
                    </InputWrapper>

                    {/* Phone Number */}
                    <InputWrapper onFocus={() => handleInputFocus('phonenumber')} onBlur={handleInputBlur} hasError={errors.phonenumber ? true : false}>
                        <InputImg
                            srcImg={
                                errors.phonenumber
                                    ? inputList.phonenumber.imgError
                                    : inputFocus === 'phonenumber'
                                        ? inputList.phonenumber.imgActive
                                        : inputList.phonenumber.imgDefault
                            }
                        />

                        <Controller
                            name='phonenumber'
                            control={control}
                            rules={{
                                required: 'Required field',
                                validate: {
                                    validPhoneNumber: (value) => {
                                        try {
                                            const phoneNumber = parsePhoneNumberFromString(`+${value}`);


                                            if (phoneNumber && phoneNumber.isValid()) {
                                                const fullNumber = `+${phoneNumber.countryCallingCode}${phoneNumber.nationalNumber}`;
                                                return true;
                                            } else {
                                                console.error('Invalid phone number format');
                                                return false;
                                            }

                                        } catch (error) {
                                            console.error('Error validating phone number:', error);
                                            return false;
                                        }

                                    },
                                },
                            }}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    inputProps={{
                                        id: 'phoneInput',
                                    }}
                                    placeholder=''
                                    containerClass={styles.phoneinput_container}
                                    inputClass={`${styles.phoneinput_input} ${inputFocus === 'phonenumber' || !!getValues('phonenumber')
                                        ? styles.phoneinput_input_focused
                                        : ''
                                        }`}
                                    buttonClass={styles.phoneinput_country}
                                />
                            )}
                        />

                        <InputLabel
                            titleLabel='Phone Number'
                            idHtmlFor='phoneInput'
                            isInputFocused={inputFocus === 'phonenumber' || !!getValues('phonenumber')}
                            hasError={errors.phonenumber ? true : false}
                        />
                        <p className={styles.modal_error}>{errors.phonenumber?.message}</p>
                    </InputWrapper>

                    {/* address */}
                    <InputWrapper
                        onFocus={() => handleInputFocus('shippingAddress')}
                        onBlur={handleInputBlur}
                        hasError={errors.shippingAddress ? true : false}
                    >
                        <InputImg
                            srcImg={
                                errors.shippingAddress
                                    ? inputList.shippingAddress.imgError
                                    : inputFocus === 'shippingAddress'
                                        ? inputList.shippingAddress.imgActive
                                        : inputList.shippingAddress.imgDefault
                            }
                        />
                        <InputField
                            label="shippingAddress"
                            typeInput='address'
                            register={register}
                            required='Required field'
                            maxLengthInput={255}
                            idHtmlFor='shippingaddressinput'
                            isInputFocused={inputFocus === 'shippingAddress' || !!getValues('shippingAddress')}
                        />

                        <InputLabel
                            titleLabel='Shipping Address'
                            idHtmlFor='shippingaddressinput'
                            isInputFocused={inputFocus === 'shippingAddress' || !!getValues('shippingAddress')}
                            hasError={errors.shippingAddress ? true : false}
                        />
                        <p className={styles.modal_error}>{errors.shippingAddress?.message}</p>
                    </InputWrapper>

                    {/* time */}
                    <InputWrapper onFocus={() => handleInputFocus('timedelivery')} onBlur={handleInputBlur} hasError={errors.timedelivery ? true : false}>
                        <SelectField
                            name='timedelivery'
                            register={register}
                            required='Required field'
                            options={optionsSelectTime}
                            isInputFocused={inputFocus === 'timedelivery' || !!getValues('timedelivery')}
                            idHtmlFor='timedeliveryinput'
                        />
                        <InputLabel
                            titleLabel='Time to Delivery'
                            idHtmlFor='timedeliveryinput'
                            isInputFocused={inputFocus === 'timedelivery' || !!getValues('timedelivery')}
                            hasError={errors.timedelivery ? true : false}
                            customClass={{ left: '1rem' }}
                        />
                        <p className={styles.modal_error}>{errors.timedelivery?.message}</p>
                    </InputWrapper>
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
                        handle={() => onSubmitForm}
                        disabled={!isDirty || !isValid}
                    />
                </div>
            </form>
            {/*! Удалить в самом конце проекта */}
            {/* <DevTool control={control} /> */}

            {isFormSubmitted ? <ModalSuccess toggleModal={toggleModal} data={formData} /> : ''}

        </ModalWrapper>

    )
}
