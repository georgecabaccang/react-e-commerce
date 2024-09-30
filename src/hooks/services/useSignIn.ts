import { IUser, signIn } from "../../store/userStore/userSlice";
import { useDispatch } from "react-redux";
import URLS from "../../constants/urls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PAGES from "../../constants/pages";
import useAPIRequest from "./useAPIRequest";
import { ICart, loadCart } from "../../store/cartStore/cartSlice";
import SUCCESS from "../../constants/success";
import ERRORS from "../../constants/errors";

interface ILoginData {
    user: IUser;
    cart: ICart;
}

interface IUseSignInReturn {
    signInUser: (email: string, password: string) => void;
    signInError: string | null;
}

const useSignIn = (): IUseSignInReturn => {
    const [signInError, setSignInError] = useState<string | null>(null);

    // Get state from user store/slice
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const request = useAPIRequest();

    async function signInUser(email: string, password: string) {
        const responseData = await request(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_IN, {
            email: email,
            password: password,
        });

        if (responseData.message !== SUCCESS.SIGN_IN_SUCCESSFUL) {
            return setSignInError(ERRORS.INVALID_CREDENTIALS);
        }

        const userData = responseData.data as ILoginData;

        dispatch(signIn(userData.user));
        dispatch(loadCart(userData.cart));
        navigate(`/${PAGES.STORE}`, { replace: true });
    }

    return { signInUser, signInError };
};

export default useSignIn;
