import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Cart() {
    const cart = useSelector((state: RootState) => state.cart.items);

    return (
        <ul>
            {cart.map((item) => {
                return <li>{item.title}</li>;
            })}
        </ul>
    );
}
