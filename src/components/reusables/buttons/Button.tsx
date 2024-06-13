import styles from "./Button.module.css";

interface IFormButton {
    children: React.ReactNode;
    name: string;
    clickFunction?: () => void;
    type: "submit" | "reset" | "button" | undefined;
    disabled: boolean;
    backgroundcolor?: string;
    rounded?: boolean;
    height?: "h-small" | "h-medium" | "h-large";
}

export default function Button({
    children,
    name,
    clickFunction,
    type,
    disabled,
    backgroundcolor,
    rounded,
    height,
}: IFormButton) {
    return (
        <button
            className={`${
                disabled ? styles.button_disabled : `${styles.button} ${backgroundcolor}`
            } ${!rounded && "rounded-none"} ${height}`}
            disabled={disabled}
            name={name}
            onClick={clickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
