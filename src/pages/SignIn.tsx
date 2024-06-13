import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import LogoBlack from "../assets/logos/we-got-it-black.png";
import SIZE from "../constants/images";
import ContentContainer from "../components/reusables/layouts/ContentContainer";
import { Link } from "react-router-dom";
import PAGES from "../constants/pages";
import { useSelector } from "react-redux";
import useSignIn from "../hooks/services/useSignIn";
import { RootState } from "../store/store";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const signIn = useSignIn();
    const signedInUser = useSelector((state: RootState) => state.user.email);
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

    function handleEmail(value: string) {
        setEmail(value);
    }

    function handlePassword(value: string) {
        setPassword(value);
    }

    function handleShowPassword() {
        setPasswordShown((prev) => !prev);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!email || !password) return console.log("oh no you don't");
        signIn(email, password);
    }

    useEffect(() => {
        console.log(signedInUser, isSignedIn);
    }, [signedInUser, isSignedIn]);

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
                    rounded
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
                    rounded
                    height="h-small"
                />

                <Form.Button type="submit" name="submit" disabled={disabled} rounded={true} border>
                    Submit
                </Form.Button>
            </Form>
            <Link to={`/${PAGES.REGISTRATION}`}>Sign Up</Link>
        </ContentContainer>
    );
}
