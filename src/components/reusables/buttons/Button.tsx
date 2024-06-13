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
    border?: boolean;
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
    border,
}: IFormButton) {
    return (
        <button
            className={`${
                disabled ? styles.button_disabled : `${styles.button} ${backgroundcolor}`
            } ${!rounded && "rounded-none"} ${height} ${border && styles.button_bordered}`}
            disabled={disabled}
            name={name}
            onClick={clickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
