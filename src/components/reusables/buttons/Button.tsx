interface IFormButton {
    children: React.ReactNode;
    name: string;
    clickFunction?: () => void;
    type: "submit" | "reset" | "button" | undefined;
}

export default function Button({ children, name, clickFunction, type }: IFormButton) {
    return (
        <button name={name} onClick={clickFunction} type={type}>
            {children}
        </button>
    );
}
