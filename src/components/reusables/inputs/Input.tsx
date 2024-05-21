import styles from "./Input.module.css";

interface IInput {
    children: React.ReactNode;
    value: string | number;
    onChangeFunction?: (value: string) => void;
    name: string;
    type: string;
    icon?: string;
    iconFunction?: () => void;
}

export default function Input({
    children,
    value,
    onChangeFunction,
    name,
    type,
    icon,
    iconFunction,
}: IInput) {
    function handleInput(value: string) {
        onChangeFunction && onChangeFunction(value);
    }

    return (
        <label>
            <div>{children}</div>
            <div className={styles.input_container}>
                <input
                    className={icon ? styles.input_password : styles.input}
                    value={value}
                    onChange={(event) => handleInput(event.target.value)}
                    name={name}
                    type={type}
                />
                {icon && (
                    <button type="button" className={styles.button_icon} onClick={iconFunction}>
                        <img src={icon} />
                    </button>
                )}
            </div>
        </label>
    );
}
