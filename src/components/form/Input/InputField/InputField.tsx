// InputField.tsx
import React, { useEffect, useState } from 'react';
import styles from './InputField.module.scss';
import { FormValues } from '../../../modal/ModalCheckout/ModalCheckout';
import { Path, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
    label: Path<FormValues>;
    register: UseFormRegister<FormValues>;
    required?: string;
    maxLengthInput?: number;
    typeInput?: string;
    idHtmlFor: string;
    isInputFocused?: boolean;
};

export const InputField = ({
    label,
    register,
    required,
    maxLengthInput,
    idHtmlFor,
    isInputFocused,
    typeInput = 'text',
}: InputFieldProps) => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let trimmedValue = e.target.value.trimStart().replace(/\s\s+/g, ' ');
        // Удаляем точку в конце строки, если она есть
        trimmedValue = trimmedValue.replace(/\.\s*$/, '');

        setInputValue(trimmedValue);
        register(label, {
            value: trimmedValue,
        });
    };


    return (
        <input
            className={`${styles.input_field} ${isInputFocused ? styles.input_focused : ''}`}
            type={typeInput}
            id={idHtmlFor}
            {...register(label, {
                required: required || false,
                maxLength: maxLengthInput,
                setValueAs: (value) => value.trim(),
                validate: {
                    noLeadingSpace: (value) => value.trim() !== '' || 'This field cannot be empty',
                    noLeadingSpaceInBetween: (value) =>
                        !value.startsWith(' ') || 'Cannot start with a space',
                },
            })}

            value={inputValue}
            onChange={handleChange}
        />
    );
};
