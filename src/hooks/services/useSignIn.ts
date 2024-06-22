import { IUser, userSignedIn } from "../../store/userStore/userSlice";
import { useDispatch, useSelector } from "react-redux";
import URLS from "../../constants/urls";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PAGES from "../../constants/pages";
import useAPIRequest from "./useAPIRequest";
import { loadCart } from "../../store/cartStore/cartSlice";

const useSignIn = () => {
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const dispatch = useDispatch();
    const request = useAPIRequest();

    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/${PAGES.STORE}`, { replace: true });
    }, [isSignedIn, navigate]);

    const signInUser = async (email: string, password: string) => {
        request(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_IN, {
            email: email,
            password: password,
        }).then((userResponse) => {
            const user = userResponse?.data as IUser;
            request(URLS.GET, URLS.SERVER_BASE, `${URLS.GET_CART}/${user.email}/${user._id}`).then(
                (cartResponse) => {
                    dispatch(loadCart(cartResponse?.data));
                }
            );
            dispatch(userSignedIn(user));
        });
    };
    return signInUser;
};

export default useSignIn;
