import { Link } from "react-router-dom";
import styles from "./Input.module.css";

interface IInput {
    placeholder: string;
    value: string | number;
    onChangeFunction?: (value: string) => void;
    name: string;
    type: string;
    icon?: string;
    iconFunction?: () => void;
    link?: string;
    linkName?: string;
    error?: string | null;
    onClickFunction?: () => void;
    rounded?: boolean;
    center?: boolean;
    height?: string;
    width?: string;
    focus?: boolean;
    max?: number;
    min?: number;
}

export default function Input({
    placeholder,
    value,
    onChangeFunction,
    name,
    type,
    icon,
    iconFunction,
    link,
    linkName,
    error,
    onClickFunction,
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
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onFocus={onClickFunction}
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
