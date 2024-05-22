import styles from "./Button.module.css";

interface IFormButton {
    children: React.ReactNode;
    name: string;
    clickFunction?: () => void;
    type: "submit" | "reset" | "button" | undefined;
    disabled: boolean;
}

export default function Button({ children, name, clickFunction, type, disabled }: IFormButton) {
    return (
        <button
            className={disabled ? styles.button_disabled : styles.button}
            disabled={disabled}
            name={name}
            onClick={clickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
