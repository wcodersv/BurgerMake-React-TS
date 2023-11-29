//InputField.tsx
import React from 'react';
import styles from './InputField.module.scss';
import { FormValues } from '../../../Modal/ModalCheckout/ModalCheckout';
import { Path, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
    label: Path<FormValues>;
    register: UseFormRegister<FormValues>;
    required: string;
    typeBtn?: string;
    idHtmlFor: string;
    isInputFocused?: boolean;
};

export const InputField = ({ label, register, required, idHtmlFor, isInputFocused, typeBtn = 'text' }: InputFieldProps) => {
    return (
        <input
            className={`${styles.input_field} ${isInputFocused ? styles.input_focused : ''}`}
            type={typeBtn}
            id={idHtmlFor}
            {...register(label, { required })}
        />
    )
}
