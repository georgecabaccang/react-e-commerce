import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import SIZE from "../constants/images";
import LogoBlack from "../assets/logos/we-got-it-black.png";
import ContentContainer from "../components/reusables/layouts/ContentContainer";
import { Link } from "react-router-dom";
import PAGES from "../constants/pages";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const [disabled, setDisabled] = useState(true);

    function handleEmail(value: string) {
        setEmail(value);
    }

    function handlePassword(value: string) {
        setPassword(value);
    }

    function handleConfirmPassword(value: string) {
        setConfirmPassword(value);
    }

    function handleShowPassword() {
        setPasswordShown((prev) => !prev);
    }

    function handleShowConfirmPassword() {
        setconfirmPasswordShown((prev) => !prev);
    }

    function handleSubmit(event: React.FormEvent) {
        event?.preventDefault();
        console.log(email, password);
    }

    useEffect(() => {
        if (password === confirmPassword) {
            return setPasswordsMatch(true);
        }
        return setPasswordsMatch(false);
    }, [password, confirmPassword]);

    useEffect(() => {
        if (email && password && confirmPassword && passwordsMatch) {
            return setDisabled(false);
        }
        return setDisabled(true);
    }, [email, password, confirmPassword, passwordsMatch]);

    return (
        <ContentContainer source={LogoBlack} size={SIZE.MEDIUM} header="Sign Up">
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
                />

                <Form.Input
                    name="confirm_Password"
                    value={confirmPassword}
                    onChangeFunction={handleConfirmPassword}
                    type={confirmPasswordShown ? "text" : "password"}
                    placeholder="Confirm Password"
                    icon={confirmPasswordShown ? ShowIcon : HideIcon}
                    iconFunction={handleShowConfirmPassword}
                    error={!passwordsMatch ? "Passwords must match" : null}
                />

                <Form.Button type="submit" name="submit" disabled={disabled}>
                    Sign Up
                </Form.Button>
            </Form>
            <Link to={`/${PAGES.SIGNIN}`}>Sign In</Link>
        </ContentContainer>
    );
}
