import { useDispatch, useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { RootState } from "../../../store/store";
import { ICart, loadCart } from "../../../store/cartStore/cartSlice";
import { useEffect } from "react";

const useAddToCart = () => {
    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const dispatch = useDispatch();
    const { request, isLoading, data } = useAPIRequest();

    const addToCart = async ({ _id, quantity }: { _id: string; quantity: number }) => {
        // reutrn if isLoading is true to avoid multiple requests
        if (isLoading) return;

        // make request to add an item to cart
        request(
            URLS.PATCH,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userEmail}/${userId}/${_id}/${quantity}`
        );
    };

    useEffect(() => {
        if (!data) return;
        const cartData = data.data as ICart;

        // update cart in store
        dispatch(loadCart(cartData));
    }, [data, dispatch]);

    return { addToCart };
};

export default useAddToCart;
