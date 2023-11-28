// InputForm.tsx
import React, { useState } from 'react';
import styles from './InputForm.module.scss';
import { animated, useSpring } from 'react-spring';

interface InputFormProps {
    name: string;
    type: string;
    inputId: string;
    imgActive?: string;
    imgDefault?: string;
    imgError?: string;
    patternTel?: string;
    options?: string[];
    requiredInput?: boolean;
}

export const InputForm = ({ name, type, imgActive, imgDefault, imgError, patternTel, requiredInput, inputId, options }: InputFormProps) => {
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [fieldValue, setFieldValue] = useState('');
    const [error, setError] = useState<boolean>(false);


    const handleFocus = () => {
        setIsInputFocused(true);

        if (type === 'tel') {
            setFieldValue('+7');
        }
    };

    const handleBlur = () => {
        setIsInputFocused(false);
        setFieldValue(fieldValue.trim());
        validateInput(); //!
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
        validateInput();
    };

    const validateInput = () => {
        setError(name !== 'Time to Delivery' && fieldValue.trim() === '');
    };



    const labelSpring = useSpring({
        top: isInputFocused || fieldValue ? '10%' : '30%',
        config: { duration: 100 },
    })

    return (
        <div className={`${styles.input_wrapper} ${isInputFocused || fieldValue ? styles.input_wrapper__focused : ''}`} style={{ borderColor: error && requiredInput ? 'var(--clr-danger)' : '' }}>
            {name !== 'Time to Delivery' && (
                <img
                    src={`${isInputFocused || fieldValue ? imgActive : error && requiredInput ? imgError : imgDefault}`}
                    alt=""
                    className={styles.input_icon}
                />
            )}

            <input
                type={type}
                id={inputId}
                className={`${styles.input_field} ${isInputFocused || fieldValue ? styles.input_field__focused : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                value={fieldValue}
                pattern={patternTel}
            />

            <animated.label
                className={`${styles.input_label} ${isInputFocused || fieldValue ? styles.input_label__focused : ''}`}
                style={{
                    ...labelSpring,
                    color: error && requiredInput ? 'var(--clr-danger)' : '',
                }}
                htmlFor={inputId}
            >
                {name}
            </animated.label>

            {error && requiredInput && <p className={styles.input_error}>Required field</p>}

        </div>
    );
};
