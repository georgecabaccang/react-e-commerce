import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import LogoBlack from "../assets/logos/we-got-it-black.png";
import SIZE from "../constants/images";
import ContentContainer from "../components/reusables/layouts/ContentContainer";
import { Link } from "react-router-dom";
import PAGES from "../constants/pages";
import useSignIn from "../hooks/services/useSignIn";
import useGetRequest from "../hooks/services/useGetRequest";
import URLS from "../constants/urls";
import { useDispatch } from "react-redux";
import { loadCart } from "../store/cartStore/cartSlice";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    const signIn = useSignIn();
    const getCart = useGetRequest();

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
        const user = await signIn(email, password);
        await getCart(`${URLS.SERVER_CART}/${user?.email}/${user?._id}`).then((response) => {
            dispatch(loadCart(response.data));
        });
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
                    rounded
                    focus
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
                    focus
                />

                <Form.Button type="submit" name="submit" disabled={disabled} rounded={true} border>
                    Submit
                </Form.Button>
            </Form>
            <Link to={`/${PAGES.REGISTRATION}`}>Sign Up</Link>
        </ContentContainer>
    );
}
