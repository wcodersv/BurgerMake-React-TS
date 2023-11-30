//InputField.tsx
import React from 'react';
import styles from './InputField.module.scss';
import { FormValues } from '../../../Modal/ModalCheckout/ModalCheckout';
import { Path, UseFormRegister, ValidationRule } from "react-hook-form";

type InputFieldProps = {
    label: Path<FormValues>;

    register: UseFormRegister<FormValues>;
    required?: string;
    pattern?: ValidationRule<RegExp>;
    typeInput?: string;
    idHtmlFor: string;
    isInputFocused?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const InputField = ({ label, register, required, pattern, idHtmlFor, isInputFocused, onChange, onKeyDown, typeInput = 'text' }: InputFieldProps) => {
    return (
        <input
            className={`${styles.input_field} ${isInputFocused ? styles.input_focused : ''}`}
            type={typeInput}
            id={idHtmlFor}
            {...register(label, { required, pattern })}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}
