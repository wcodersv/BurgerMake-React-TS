// SelectField.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './SelectField.module.scss';

interface SelectFieldProps {
    name: string;
    register: UseFormRegister<any>;
    required?: string;
    options: string[];
    isInputFocused: boolean;
    idHtmlFor: string;
}


export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
    ({ name, options, isInputFocused, idHtmlFor, register, required, ...rest }, ref) => {


        return (
            <>
                <select
                    className={`${styles.select} ${isInputFocused ? styles.select_focused : ''}`}
                    id={idHtmlFor}
                    {...register(name, { required: required || false })}
                    {...rest}

                >
                    {options.map((option: string, index: number) => (
                        <option
                            value={option}
                            key={`${option}-${index}`}
                        >
                            {option}
                        </option>
                    ))}
                </select >
            </>
        );
    });
