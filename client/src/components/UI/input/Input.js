import style from './Input.module.css';

import React, { useState, FC } from 'react';
import eye from './eye-icon.svg';

const Input = (
    {
        label,
        onChange,
        className,
        inputContainer,
        name,
        value,
        type = 'text',
        id,
        minLength,
        maxLength,
        required,
        placeholder,
        icon,
        disabled = false,
        error = false
    }) => {

    const [isShowPass, setShowPass] = useState(false)

    function setClassNames() {
        const hasIcon = icon ? style.with-icon : '';
        const hasClassName = inputContainer || '';
        const isDisabled = disabled ? style.disabled : '';
        const isError = error ? style.error : '';
        return `${hasIcon} ${hasClassName} ${isDisabled} ${isError}`
    }

    return (
        <label htmlFor={id} className={`${style.input} ${setClassNames()}`}>
            <span className={style.inputContainer}>
                <span className={style.label}>{label}</span>
                {icon && <span className={style.icon}>{icon}</span>}
                {type === 'password' &&
                    <span
                        className={style.icon}
                        onClick={() => setShowPass(!isShowPass)}
                    >
                        <img src={eye} />
                    </span>
                }
                <input
                    id={id}
                    type={type === 'text' || isShowPass ? 'text' : 'password'}
                    name={name}
                    value={value}
                    minLength={minLength && minLength}
                    maxLength={maxLength && maxLength}
                    required={required ? required : false}
                    className={`${style.inputComponent} ${style.className ?? ''}`}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                />
          </span>

        </label>

    );
};

export default Input;