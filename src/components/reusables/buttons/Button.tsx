import styles from "./Button.module.css";

interface IFormButton {
    children: React.ReactNode;
    name: string;
    clickFunction?: () => void;
    type: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
    backgroundcolor?: string;
    rounded?: boolean;
    height?: string;
    widht?: string;
    border?: boolean;
    fontWeight?: string;
    fontColor?: string;
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
    widht,
    border,
    fontWeight,
    fontColor,
}: IFormButton) {
    return (
        <button
            className={`${
                disabled ? styles.button_disabled : `${styles.button} ${backgroundcolor}`
            } ${!rounded && "rounded-none"} ${height} ${widht} ${fontWeight} ${fontColor} ${
                border && styles.button_bordered
            }`}
            disabled={disabled}
            name={name}
            onClick={clickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
