import { useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { IItem } from "../../../store/cartStore/cartSlice";
import updateLocalStorage from "../../../functions/updateLocalStorage";

const useChangeItemQuantity = () => {
    const [newQuantity, setNewQuantity] = useState<number>(0);

    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const { request, isLoading, data } = useAPIRequest();

    async function changeQuantity({ _id, quantity }: { _id: string; quantity: number }) {
        if (isLoading) return;
        request(
            URLS.PATCH,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userEmail}/${userId}/${_id}/${quantity}`
        );
    }

    useEffect(() => {
        if (!data) return;
        const itemDate = data.data as IItem;
        // update locally saved item
        updateLocalStorage(itemDate);

        setNewQuantity(itemDate.quantity);
    }, [data]);

    return { newQuantity, changeQuantity };
};

export default useChangeItemQuantity;
