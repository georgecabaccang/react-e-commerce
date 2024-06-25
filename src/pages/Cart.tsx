import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemList from "../components/cart/CartItemList";

export default function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return <CartItemList items={cartItems} />;
}
