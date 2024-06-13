import styles from "./Button.module.css";

interface IFormButton {
    children: React.ReactNode;
    name: string;
    clickFunction?: () => void;
    type: "submit" | "reset" | "button" | undefined;
    disabled: boolean;
    backgroundcolor?: string;
    rounded?: boolean;
}

export default function Button({
    children,
    name,
    clickFunction,
    type,
    disabled,
    backgroundcolor,
    rounded,
}: IFormButton) {
    return (
        <button
            className={
                disabled
                    ? styles.button_disabled
                    : `${styles.button} ${backgroundcolor} ${!rounded && "rounded-none"}`
            }
            disabled={disabled}
            name={name}
            onClick={clickFunction}
            type={type}
        >
            {children}
        </button>
    );
}
