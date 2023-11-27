import React, { useState } from 'react';
import styles from './InputForm.module.scss';

interface InputFormProps {
    name: string;
    type: string;
    imgActive?: string;
    imgDefault?: string;
    patternTel?: string;
    options?: string[];
}

export const InputForm = ({ name, type, imgActive, imgDefault, patternTel, options }: InputFormProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [fieldValue, setFieldValue] = useState('');

    const handleFocus = () => {
        setIsInputFocused(true);

        if (type === 'tel') {
            setFieldValue('+7');
        }
    };

    const handleBlur = () => {
        setIsInputFocused(false);
        setFieldValue('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    };

    return (
        <div className={`${styles.input_wrapper} ${isInputFocused ? styles.input_focused : ''}`}>
            {name !== 'Time to Delivery' && (
                <img
                    src={`${isInputFocused ? imgActive : imgDefault}`}
                    alt=""
                    className={styles.input_icon}
                />
            )}

            <input
                type={type}
                className={styles.input_field}
                placeholder={name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                value={fieldValue}
                pattern={patternTel}
                list={name === 'Time to Delivery' ? 'deliveryTimes' : undefined}
            />

            {name === 'Time to Delivery' && (
                <img
                    src={`${isInputFocused ? imgActive : imgDefault}`}
                    alt=""
                    className={styles.input_icon}
                />
            )}

            {name === 'Time to Delivery' && options && (
                <datalist id="deliveryTimes">
                    {options.map((time, index) => (
                        <option key={index} value={time}></option>
                    ))}
                </datalist>
            )}


        </div>
    );
};
