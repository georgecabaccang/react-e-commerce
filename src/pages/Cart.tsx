import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemList from "../components/cart/CartItemList";
import { useEffect } from "react";
import useAPIRequest from "../hooks/services/useAPIRequest";
import URLS from "../constants/urls";
import { loadCart } from "../store/cartStore/cartSlice";

export default function Cart() {
    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const { request, abort, loading, stopLoading } = useAPIRequest();

    const cartItemsInLocalStorage = localStorage.getItem("cartItems");

    useEffect(() => {
        if (JSON.stringify(cartItems) === cartItemsInLocalStorage) return stopLoading();

        getCart();
        async function getCart() {
            const cart = await request(
                URLS.GET,
                URLS.SERVER_BASE,
                `${URLS.GET_CART}/${userEmail}/${userId}`
            );

            if (!cart) return;
            dispatch(loadCart(cart.data));
        }

        return () => abort();
    }, [
        abort,
        cartItems,
        cartItemsInLocalStorage,
        dispatch,
        request,
        stopLoading,
        userEmail,
        userId,
    ]);

    if (loading) {
        return "loading pa";
    }

    return <CartItemList items={cartItems} />;
}
