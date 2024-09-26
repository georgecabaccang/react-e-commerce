import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { removeItemFromCart } from "../../../store/cartStore/cartSlice";
import { RootState } from "../../../store/store";

const useRemoveFromCart = () => {
    const [itemId, setItemId] = useState<string | null>(null);

    const userEmail = useSelector((state: RootState) => state.user.email);
    const userId = useSelector((state: RootState) => state.user._id);
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    const { request, isLoading, data } = useAPIRequest();
    const dispatch = useDispatch();

    const removeItem = (_id: string) => {
        setItemId(_id);
    };

    useEffect(() => {
        if (isLoading) return;
        if (!itemId) return;
        if (isOpen) return;

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
        if (!data) return;
        setItemId(null);
        dispatch(removeItemFromCart({ _id: itemId }));
    }, [dispatch, itemId, isLoading, data]);

    return { removeItem };
};

export default useRemoveFromCart;
