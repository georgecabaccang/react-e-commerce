import { IUser, userSignedIn } from "../../store/userStore/userSlice";
import { useDispatch, useSelector } from "react-redux";
import URLS from "../../constants/urls";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PAGES from "../../constants/pages";
import useAPIRequest from "./useAPIRequest";
import { ICart, loadCart } from "../../store/cartStore/cartSlice";

const useSignIn = () => {
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const dispatch = useDispatch();
    const {
        request: userRequest,
        isLoading: loadingUser,
        data: user,
        requestError: userRequestError,
    } = useAPIRequest();
    const {
        request: cartRequest,
        isLoading: loadingCart,
        data: cart,
        requestError: cartRequestError,
    } = useAPIRequest();

    const navigate = useNavigate();

    const signInUser = async (email: string, password: string) => {
        userRequest(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_IN, {
            email: email,
            password: password,
        });
    };

    useEffect(() => {
        if (!user) return;
        if (loadingCart) return;
        if (cart) return;
        const userDetails = user?.data as IUser;

        cartRequest(
            URLS.GET,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userDetails.email}/${userDetails._id}`
        );
    }, [cartRequest, dispatch, loadingCart, user, cart]);

    useEffect(() => {
        const userDetails = user?.data as IUser;
        const cartDetails = cart?.data as ICart;
        if (userRequestError || cartRequestError)
            return console.log(userRequestError, cartRequestError);

        if (!userDetails || !cartDetails) return;

        dispatch(userSignedIn(userDetails));
        dispatch(loadCart(cartDetails));
    }, [user, cart, dispatch, userRequestError, cartRequestError]);

    useEffect(() => {
        if (loadingUser || loadingCart) return;
        if (!user || !cart) return;
        navigate(`/${PAGES.STORE}`, { replace: true });
    }, [cart, isSignedIn, loadingCart, loadingUser, navigate, user]);

    return { signInUser };
};

export default useSignIn;
