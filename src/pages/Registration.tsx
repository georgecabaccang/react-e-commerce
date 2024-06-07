import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import SIZE from "../constants/images";
import LogoBlack from "../assets/logos/we-got-it-black.png";
import ContentContainer from "../components/reusables/layouts/ContentContainer";
import { Link } from "react-router-dom";
import PAGES from "../constants/pages";
import * as EmailValidator from "email-validator";
import axios, { AxiosError } from "axios";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailTouched, setEmailTouched] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const [disabled, setDisabled] = useState(true);

    function handleEmail(value: string) {
        setEmail(value);
    }

    function handleTouchEmail() {
        !emailTouched ? setEmailTouched(true) : null;
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

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!email || !password || !confirmPassword) return console.log("really?");

        try {
            const { data } = await axios.post("http://localhost:8002/user/sign-up", {
                email: email,
                password: password,
            });
            console.log(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    }

    useEffect(() => {
        if (EmailValidator.validate(email)) {
            return setIsValidEmail(true);
        }
        return setIsValidEmail(false);
    }, [email]);

    useEffect(() => {
        if (password === confirmPassword) {
            return setPasswordsMatch(true);
        }
        return setPasswordsMatch(false);
    }, [password, confirmPassword]);

    useEffect(() => {
        if (email && isValidEmail && password && confirmPassword && passwordsMatch) {
            return setDisabled(false);
        }
        return setDisabled(true);
    }, [email, isValidEmail, password, confirmPassword, passwordsMatch]);

    return (
        <ContentContainer source={LogoBlack} size={SIZE.MEDIUM} header="Sign Up">
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    name="email"
                    value={email}
                    onChangeFunction={handleEmail}
                    type="email"
                    placeholder="Email Address"
                    onClickFunction={handleTouchEmail}
                    error={
                        !isValidEmail && emailTouched ? "Please enter a valid email address" : null
                    }
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
