// InputForm.tsx
import React, { useState } from 'react';
import styles from './InputForm.module.scss';
import { animated, useSpring } from 'react-spring';

interface InputFormProps {
    name: string;
    type: string;
    inputId: string;
    inputIdList?: string;
    imgActive?: string;
    imgDefault?: string;
    imgError?: string;
    patternTel?: string;
    options?: string[];
    requiredInput?: boolean;
    handleChange: (value: string) => void;
    value: string;
}

export const InputForm = ({
    name,
    type,
    imgActive,
    imgDefault,
    imgError,
    patternTel,
    requiredInput,
    inputId,
    inputIdList,
    options,
    handleChange,
    value,
}: InputFormProps) => {
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Обработчик фокуса на поле ввода
    const handleFocus = () => {
        setIsInputFocused(true);

        if (type === 'tel') {
            // Устанавливаем начальное значение для номера телефона
            handleChange('+7');
        }
    };

    // Обработчик потери фокуса полем ввода
    const handleBlur = () => {
        setIsInputFocused(false);
        handleChange(value.trim());
        validateInput();
    };

    // Обработчик изменения значения в поле ввода
    const handleChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event.target.value);
        validateInput();
    };

    // Валидация ввода
    const validateInput = () => {
        setError(value.trim() === '');
    };

    // Анимация для label над полем ввода
    const labelSpring = useSpring({
        top: isInputFocused || value ? '10%' : '30%',
        config: { duration: 100 },
    });


    return (
        <div
            className={`${styles.input_wrapper} ${isInputFocused || value ? styles.input_wrapper__focused : ''}`}
            style={{ borderColor: error && requiredInput ? 'var(--clr-danger)' : '' }}
        >
            {name !== 'Time to Delivery' && (
                <img
                    src={`${isInputFocused || value ? imgActive : error && requiredInput ? imgError : imgDefault}`}
                    alt=""
                    className={styles.input_icon}
                />
            )}

            <input
                type={type}
                id={inputId}
                className={`${styles.input_field} ${isInputFocused || value ? styles.input_field__focused : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeInternal}
                value={value}
                pattern={patternTel}
                required={requiredInput ? true : false}
                list={name === 'Time to Delivery' ? inputIdList : undefined}
            />
            {options && name === 'Time to Delivery' && (
                <datalist id={inputIdList}>
                    {options.map((time, index) => (
                        <option key={index} value={time}></option>
                    ))}
                </datalist>
            )}

            <animated.label
                className={`${styles.input_label} ${isInputFocused || value ? styles.input_label__focused : ''}`}
                style={{
                    ...labelSpring,
                    color: error && requiredInput ? 'var(--clr-danger)' : '',
                    left: name === 'Time to Delivery' ? '1rem' : '',
                }}
                htmlFor={inputId}

            >
                {name}
            </animated.label>

            {error && requiredInput &&
                <p
                    className={styles.input_error}
                    style={{
                        left: name === 'Time to Delivery' ? '1rem' : '',
                    }}
                >
                    Required field
                </p>
            }
        </div>
    );
};
