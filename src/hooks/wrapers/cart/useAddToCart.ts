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
        if (isLoading) return;
        request(
            URLS.PATCH,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userEmail}/${userId}/${_id}/${quantity}`
        );
    };

    useEffect(() => {
        if (!data) return;
        const cartData = data.data as ICart;
        dispatch(loadCart(cartData));
    }, [data, dispatch]);

    return { addToCart };
};

export default useAddToCart;
