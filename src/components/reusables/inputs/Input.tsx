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
}: IInput) {
    function handleInput(value: string) {
        onChangeFunction && onChangeFunction(value);
    }

    return (
        <label>
            <div className={styles.input_container}>
                <input
                    className={icon ? styles.input_password : styles.input}
                    value={value}
                    onChange={(event) => handleInput(event.target.value)}
                    name={name}
                    type={type}
                    placeholder={placeholder}
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
        </label>
    );
}
