// ModalCheckout.tsx
import React, { useEffect, useState } from 'react';
import { DevTool } from "@hookform/devtools";
import { useForm, FormProvider, SubmitHandler, FieldErrors } from "react-hook-form"
import styles from './ModalCheckout.module.scss';
import ModalWrapper from '../ModalWrapper';
import ModalHeader from '../ModalHeader';
import ButtonAction from '../../ButtonAction';
import InputWrapper from '../../form/Input/InputWrapper';
import InputField from '../../form/Input/InputField';
import InputLabel from '../../form/Input/InputLabel';
import InputImg from '../../form/Input/InputImg';

const inputList = {
    'username': {
        imgActive: '/assets/svg/form-icon-smile-active.svg',
        imgDefault: '/assets/svg/form-icon-smile-disabled.svg',
        imgError: '/assets/svg/form-icon-smile-error.svg',
    },
    'phonenumber': {
        imgActive: '/assets/svg/form-icon-phone-active.svg',
        imgDefault: '/assets/svg/form-icon-phone-disabled.svg',
        imgError: '/assets/svg/form-icon-phone-error.svg',
    },
    'shippingAddress': {
        imgActive: '/assets/svg/form-icon-address-active.svg',
        imgDefault: '/assets/svg/form-icon-address-disabled.svg',
        imgError: '/assets/svg/form-icon-address-error.svg',
    },
};


interface ModalCheckoutProps {
    toggleModal: () => void,
}

export type FormValues = {
    username: string;
    phonenumber: string;
    shippingAddress: string;
    example: string;
}


export const ModalCheckout = ({ toggleModal }: ModalCheckoutProps) => {
    const methods = useForm<FormValues>({
        defaultValues: {
            username: '',
            phonenumber: '',
            shippingAddress: '',
            example: '',
        },
        mode: 'onTouched'
    });


    const { register, reset, control, handleSubmit, formState, getValues } = methods;
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;



    const [inputFocus, setInputFocus] = useState<string | null>(null);

    //*
    const handleInputFocus = (inputName: string) => {
        setInputFocus(inputName);
    };

    //*
    const handleInputBlur = () => {
        setInputFocus(null);
    };

    //*
    const onSubmitForm = (data: FormValues) => {
        console.log(data)

        //& toggleModal(); 
    }

    //*
    const onError = (errors: FieldErrors<FormValues>) => {
        console.log('Form errors', errors)
    }

    //*
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset])


    return (
        <ModalWrapper >
            <ModalHeader title='Checkout' handle={toggleModal} />
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmitForm, onError)}
                    className={styles.modal_form}
                    noValidate
                >
                    <div className={styles.modal_form_main}>
                        {/* firstName */}
                        <InputWrapper onFocus={() => handleInputFocus('username')} onBlur={handleInputBlur} hasError={errors.username ? true : false}>
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
                        <InputWrapper onFocus={() => handleInputFocus('username')} onBlur={handleInputBlur} hasError={errors.username ? true : false}>
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

                        {/* email */}
                        <InputWrapper onFocus={() => handleInputFocus('shippingAddress')} onBlur={handleInputBlur} hasError={errors.shippingAddress ? true : false}>
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
                                typeBtn='address'
                                register={register}
                                required='Required field'
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
            </FormProvider>

            {/*! Удалить в самом конце проекта */}
            <DevTool control={control} />
        </ModalWrapper>
    )
}
