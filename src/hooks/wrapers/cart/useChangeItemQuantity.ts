import { useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { IItem } from "../../../store/cartStore/cartSlice";
import updateLocalStorage from "../../../functions/updateLocalStorage";

const useChangeItemQuantity = () => {
    const [newQuantity, setNewQuantity] = useState<number>(0);

    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const { request, abort } = useAPIRequest();

    async function changeQuantity({
        id,
        title,
        price,
        quantity,
    }: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    }) {
        const { data }: { data: IItem } = await request(
            URLS.PATCH,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userEmail}/${userId}/${id}/${quantity}`,
            {
                id: id,
                title: title,
                price: price,
                quantity: quantity,
            }
        );

        // update locally saved item
        updateLocalStorage(data);
        
        setNewQuantity(data.quantity);
    }

    return { newQuantity, changeQuantity, abort };
};

export default useChangeItemQuantity;
