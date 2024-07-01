import { useDispatch, useSelector } from "react-redux";
import useAPIRequest from "../../services/useAPIRequest";
import URLS from "../../../constants/urls";
import { RootState } from "../../../store/store";
import { loadCart } from "../../../store/cartStore/cartSlice";

const useAddToCart = () => {
    const userId = useSelector((state: RootState) => state.user._id);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const dispatch = useDispatch();
    const { request, abort } = useAPIRequest();

    const addToCart = async ({
        id,
        title,
        price,
        quantity,
    }: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    }) => {
        const response = await request(
            URLS.PATCH,
            URLS.SERVER_BASE,
            `${URLS.GET_CART}/${userEmail}/${userId}`,
            {
                id: id,
                title: title,
                price: price,
                quantity: quantity,
            }
        );

        dispatch(loadCart(response.data));
    };
    return { addToCart, abort };
};

export default useAddToCart;
