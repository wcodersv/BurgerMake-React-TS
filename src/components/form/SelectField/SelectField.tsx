// SelectField.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './SelectField.module.scss';

interface SelectFieldProps {
    options: string[];
    isInputFocused: boolean;
    idHtmlFor: string;
}


export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps & ReturnType<UseFormRegister<any>>>
    (({ onChange, name, options, isInputFocused, idHtmlFor }, ref) => {

        return (
            <>
                <select
                    name={name} ref={ref as React.Ref<HTMLSelectElement>}
                    onChange={onChange}
                    className={`${styles.select} ${isInputFocused ? styles.select_focused : ''}`}
                    id={idHtmlFor}
                >
                    {options.map((option: string, index: number) => (
                        <option
                            value={option}
                            key={`${option}-${index}`}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </>
        );
    });
