import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemList from "../components/cart/CartItemList";
import { useEffect } from "react";
import useAPIRequest from "../hooks/services/useAPIRequest";
import URLS from "../constants/urls";
import { ICart, loadCart } from "../store/cartStore/cartSlice";
import compareJSON from "../functions/compareJSON";

export default function Cart() {
    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();
    const { request, data, isLoading } = useAPIRequest();

    useEffect(() => {
        // return if products have already been retrieved from db
        if (isLoading) return;

        // compare if locally saved cart items are equal, if so, stop the loading and return
        if (compareJSON(cartItems)) return;

        // return if modal is open to avoid multiple requests
        if (isOpen) return;
        request(URLS.GET, URLS.SERVER_BASE, `${URLS.GET_CART}/${userEmail}/${userId}`);
    }, [request, userEmail, userId, cartItems, data, isLoading]);

    useEffect(() => {
        // if data is yet to be receieved, return to avoid "undefined" or "null" errors
        if (!data) return;

        const cartData = data.data as ICart;

        // update cart store state for cart details
        dispatch(loadCart(cartData));
    }, [data, dispatch]);

    if (!cartItems) {
        return "Loading";
    }

    if (cartItems !== undefined && !cartItems.length) {
        return "Cart is Empty";
    }
    console.log(cartItems);
    return <CartItemList items={cartItems} />;
}
