import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import LogoBlack from "../assets/logos/we-got-it-black.png";
import SIZE from "../constants/images";
import ContentContainer from "../components/reusables/layouts/ContentContainer";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [disabled, setDisabled] = useState(true);

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

    useEffect(() => {
        if (email && password) {
            return setDisabled(false);
        }
        setDisabled(true);
    }, [email, password]);

    return (
        <ContentContainer
            source={LogoBlack}
            size={SIZE.MEDIUM}
            header="Welcome Back!"
            subheader="Please login to your account"
        >
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    name="email"
                    value={email}
                    onChangeFunction={handleEmail}
                    type="email"
                    placeholder="Email Address"
                />

                <Form.Input
                    name="password"
                    value={password}
                    onChangeFunction={handlePassword}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    icon={passwordShown ? ShowIcon : HideIcon}
                    iconFunction={handleShowPassword}
                    link="/forgot-password"
                    linkName="Forgot your password?"
                />

                <Form.Button type="submit" name="submit" disabled={disabled}>
                    Submit
                </Form.Button>
            </Form>
        </ContentContainer>
    );
}
