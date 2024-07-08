import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { removeItemFromCart } from "../../../store/cartStore/cartSlice";
import { RootState } from "../../../store/store";

const useRemoveFromCart = () => {
    const [itemId, setItemId] = useState<number | null>(null);

    const userEmail = useSelector((state: RootState) => state.user.email);
    const userId = useSelector((state: RootState) => state.user._id);

    const { request, isLoading } = useAPIRequest();
    const dispatch = useDispatch();

    const removeItem = (id: number) => {
        setItemId(id);
    };

    useEffect(() => {
        if (isLoading) return;
        if (!itemId) return;

        removeItemFromDBCart();
        async function removeItemFromDBCart() {
            request(
                URLS.PATCH,
                URLS.SERVER_BASE,
                `${URLS.GET_CART}/${userEmail}/${userId}/${itemId}`
            );
        }
    }, [isLoading, itemId, request, userEmail, userId]);

    useEffect(() => {
        if (isLoading) return;
        if (!itemId) return;
        setItemId(null);
        dispatch(removeItemFromCart({ id: itemId! }));
    }, [dispatch, itemId, isLoading]);

    return { removeItem };
};

export default useRemoveFromCart;
