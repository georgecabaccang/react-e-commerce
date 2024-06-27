import { Link } from "react-router-dom";
import styles from "./Input.module.css";
import { ChangeEvent } from "react";

interface IInput {
    onChangeFunction?: (value: string) => void;
    iconFunction?: () => void;
    onClickFunction?: () => void;
    onBlurFunction?: (value: string) => void;
    placeholder: string;
    value: string | number;
    name: string;
    type: string;
    icon?: string;
    link?: string;
    linkName?: string;
    error?: string | null;
    rounded?: boolean;
    center?: boolean;
    height?: string;
    width?: string;
    focus?: boolean;
    max?: number;
    min?: number;
}

export default function Input({
    onChangeFunction,
    iconFunction,
    onClickFunction,
    onBlurFunction,
    placeholder,
    value,
    name,
    type,
    icon,
    link,
    linkName,
    error,
    rounded,
    center,
    height,
    width,
    focus,
    max,
    min,
}: IInput) {
    function handleInput(value: string) {
        onChangeFunction && onChangeFunction(value);
    }

    function handleBlur(value: string) {
        onBlurFunction && onBlurFunction(value);
    }

    function handleOnFocus(event: ChangeEvent<HTMLInputElement>) {
        onClickFunction && onClickFunction();
        event.target.select();
    }

    return (
        <label className={styles.parent_container}>
            <div className={styles.input_container}>
                <input
                    className={`${icon ? styles.input_password : styles.input} ${
                        !rounded && "rounded-none"
                    } ${center && "text-center px-0"} ${height} ${width} ${
                        !focus && "focus:shadow-none"
                    }`}
                    value={value}
                    onChange={(event) => handleInput(event.target.value)}
                    onBlur={(event) => handleBlur(event.target.value)}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onFocus={handleOnFocus}
                    max={max}
                    min={min}
                />
                {icon && (
                    <button type="button" className={styles.button_icon} onClick={iconFunction}>
                        <img src={icon} />
                    </button>
                )}
            </div>
            {link && (
                <div className={styles.input_link}>
                    <Link to={link}>{linkName}</Link>
                </div>
            )}
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
}
