import Button from "../buttons/Button";
import ButtonGroup from "../buttons/ButtonGroup";
import Errors from "../errors/Error";
import Input from "../inputs/Input";
import styles from "./Form.module.css";

interface IForm {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent) => void;
}

export default function Form({ children, onSubmit }: IForm) {
    return (
        <form onSubmit={(event) => onSubmit(event)} className={styles.form}>
            {children}
        </form>
    );
}

Form.Error = Errors;
Form.Input = Input;
Form.ButtonGroup = ButtonGroup;
Form.Button = Button;
