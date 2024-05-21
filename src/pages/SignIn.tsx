import { useState } from "react";
import Form from "../components/reusables/form/Form";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    function handleEmail(value: string) {
        setEmail(value);
    }

    function handlePassword(value: string) {
        setPassword(value);
    }

    function handleShowPassword() {
        setPasswordShown((prev) => !prev);
    }

    function handleSubmit(event: React.FormEvent) {
        event?.preventDefault();
        console.log(email, password);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input name="email" value={email} onChangeFunction={handleEmail} type="text">
                Email:
            </Form.Input>
            <Form.Input
                name="password"
                value={password}
                onChangeFunction={handlePassword}
                type={passwordShown ? "text" : "password"}
            >
                Password:
            </Form.Input>
            <Form.Button type="submit" name="show_password">
                Submit
            </Form.Button>
        </Form>
    );
}
