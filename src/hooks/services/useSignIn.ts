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
    // Get state from user store/slice
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // START of useAPIRequest hooks -----------------------------------------------
    /* Assign aliases for each one to minimize if not clear up confussion. */
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
    // END of useAPIRequest hooks -----------------------------------------------

    // =============================== START OF SIGN IN FLOW =============================== //

    /* 
    ### NOTES: ###
        -- STEP 1 triggers the flow through the user's data on completion of the request.
        -- The user's data is a dependency of the useEffect in STEP 2, which will then trigger
           the next step and so on and so forth. 
     */

    /* *** STEP 1 *** */
    // START of sign in reuqest -----------------------------------------------------
    const signInUser = async (email: string, password: string) => {
        // check if request for user's data is on-going, return if true
        if (loadingUser) return;

        // check if a user is already signed in, return if true
        if (isSignedIn) return;

        // make a request to retrieve user's data and if user is indeed signed up
        userRequest(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_IN, {
            email: email,
            password: password,
        });
    };
    // END of sign in reuqest -------------------------------------------------------

    /* *** STEP 2 *** */
    // START of getting user's cart -------------------------------------------------
    useEffect(() => {
        // check if user data is not null or undefined, return if null or undefined
        if (!user) return;

        // check if request for user's cart is on-going, return if ture
        if (loadingCart) return;

        // check if data for cart is already retrieved, return if true
        if (cart) return;

        // cast user data to IUser interface
        const userDetails = user?.data as IUser;

        // make a request to retrieve user's cart data
        cartRequest(
            URLS.GET,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userDetails.email}/${userDetails._id}`
        );
    }, [cartRequest, loadingCart, user, cart]);
    // END of getting user's cart ---------------------------------------------------

    /* *** STEP 3 *** */
    // START of storing user and cart data to store ---------------------------------
    useEffect(() => {
        // cast data retrieved to respective interfaces
        const userDetails = user?.data as IUser;
        const cartDetails = cart?.data as ICart;

        // check if any error has occurred during request
        if (userRequestError || cartRequestError)
            return console.log(userRequestError, cartRequestError);

        // check if user or cart is null or undefined, return if true
        if (!userDetails || !cartDetails) return;

        // save user and cart data to store
        dispatch(userSignedIn(userDetails));
        dispatch(loadCart(cartDetails));
    }, [user, cart, dispatch, userRequestError, cartRequestError]);
    // END of storing user and cart data to store -----------------------------------

    /* *** STEP 4 *** */
    // START of navigating to Shop/Store page after sign in flow has been completed -
    useEffect(() => {
        // check if any request is being made, return if true.
        if (loadingUser || loadingCart) return;

        // check if user or cart is null or undefined, return if true
        if (!user || !cart) return;

        // navigate if all needed data is retrieved
        navigate(`/${PAGES.STORE}`, { replace: true });
    }, [cart, isSignedIn, loadingCart, loadingUser, navigate, user]);
    // END of navigating to Shop/Store page after sign in flow has been completed ---

    // =============================== END OF SIGN IN FLOW =============================== //

    return { signInUser };
};

export default useSignIn;
