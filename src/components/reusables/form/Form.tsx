import Button from "../buttons/Button";
import ButtonGroup from "../buttons/ButtonGroup";
import Input from "../inputs/Input";

interface IForm {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent) => void;
}

export default function Form({ children, onSubmit }: IForm) {
    return <form onSubmit={(event) => onSubmit(event)}>{children}</form>;
}

Form.Input = Input;
Form.ButtonGroup = ButtonGroup;
Form.Button = Button;
