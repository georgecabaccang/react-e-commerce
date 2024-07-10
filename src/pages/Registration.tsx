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
import useSignIn from "../hooks/services/useSignIn";
import URLS from "../constants/urls";
import useAPIRequest from "../hooks/services/useAPIRequest";

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

    const { signInUser } = useSignIn();
    const { request, isLoading, data } = useAPIRequest();

    // START of handlers for setState functions ------------------------------------------------
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
    // END of handlers for setState functions ---------------------------------------------------

    // =============================== START OF SIGN UP FLOW =============================== //

    /* *** STEP 1 *** */
    // START of signing up user ----------------------------------------------------
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // check if inputs are not empty
        if (!email || !password || !confirmPassword) return console.log("really?");

        // check if sign-up request is on-going, return if true
        if (isLoading) return;

        // make a sign-up request
        request(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_UP, {
            email: email,
            password: password,
        });
    }
    // END of signing up user ------------------------------------------------------

    /* *** STEP 2 *** */
    // START of signing in user after successful registration ----------------------
    useEffect(() => {
        // check if user's has successfully signed up, return if false
        if (!data) return;

        // continue to sign in user
        signInUser(email, password);
    }, [data, isLoading, signInUser, email, password]);
    // END of signing in user after successful registration ------------------------

    // ================================ END OF SIGN UP FLOW ================================ //

    // Start of Validations ------------------------------------------------------
    // Email validator
    useEffect(() => {
        if (EmailValidator.validate(email)) {
            return setIsValidEmail(true);
        }
        return setIsValidEmail(false);
    }, [email]);

    // Password and Confirm Password validator
    useEffect(() => {
        if (password === confirmPassword) {
            return setPasswordsMatch(true);
        }
        return setPasswordsMatch(false);
    }, [password, confirmPassword]);

    // Handles enabling/disabling submit button through validation
    useEffect(() => {
        if (email && isValidEmail && password && confirmPassword && passwordsMatch) {
            return setDisabled(false);
        }
        return setDisabled(true);
    }, [email, isValidEmail, password, confirmPassword, passwordsMatch]);
    // End of Validations ---------------------------------------------------------

    if (isLoading) {
        return "Signin Up";
    }

    return (
        <ContentContainer source={LogoBlack} size={SIZE.MEDIUM} header="Sign Up">
            <Form onSubmit={handleSubmit}>
                {/* START of Email input */}
                <Form.Input
                    name="email"
                    value={email}
                    onChangeFunction={handleEmail}
                    type="email"
                    placeholder="Email Address"
                    onClickFunction={handleTouchEmail}
                    error={
                        // show error if email is invalid AND input has been touched/focused
                        !isValidEmail && emailTouched ? "Please enter a valid email address" : null
                    }
                    rounded
                    focus
                />
                {/* END of Email input */}

                {/* START of Password input */}
                <Form.Input
                    name="password"
                    value={password}
                    onChangeFunction={handlePassword}
                    type={
                        // changes input type to "text" to show password if "closed eye" icon is clicked, then back to "password" if "opened eye" is clicked
                        passwordShown ? "text" : "password"
                    }
                    placeholder="Password"
                    icon={
                        // changes shown eye icon depending if user wants to show/hide their password
                        passwordShown ? ShowIcon : HideIcon
                    }
                    iconFunction={handleShowPassword}
                    rounded
                    focus
                />
                {/* END of Password input */}

                {/* START of Confirm Password input */}
                <Form.Input
                    name="confirm_Password"
                    value={confirmPassword}
                    onChangeFunction={handleConfirmPassword}
                    type={
                        // changes input type to "text" to show password if "closed eye" icon is clicked, then back to "password" if "opened eye" is clicked
                        confirmPasswordShown ? "text" : "password"
                    }
                    placeholder="Confirm Password"
                    icon={
                        // changes shown eye icon depending if user wants to show/hide their password
                        confirmPasswordShown ? ShowIcon : HideIcon
                    }
                    iconFunction={handleShowConfirmPassword}
                    error={
                        // show error if password and confirm password don't match
                        !passwordsMatch ? "Passwords must match" : null
                    }
                    rounded
                    focus
                />
                {/* START of Confirm Password input */}

                <Form.Button type="submit" name="submit" disabled={disabled} rounded border>
                    Sign Up
                </Form.Button>
            </Form>
            <Link to={`/${PAGES.SIGNIN}`}>Sign In</Link>
        </ContentContainer>
    );
}
