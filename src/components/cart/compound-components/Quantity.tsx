import styles from "../CartItemList.module.css";
import QuantityBox from "../../reusables/inputs/quantity-box/QuantityBox";
import useAddToCart from "../../../hooks/wrapers/cart/useAddToCart";
import { IItem } from "../../../store/cartStore/cartSlice";

export default function Quantity({ quantity, item }: { quantity: number; item: IItem }) {
    const changeQuantity = useAddToCart();

    async function changeDBQuantity(quantity: number) {
        console.log(quantity);
        await changeQuantity({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: quantity,
        });
    }
    return (
        <div className={styles.cart_item__quantity}>
            <span>Quantity:</span>
            <QuantityBox
                lowerLimit={1}
                higherLimit={100}
                currentQuantity={quantity}
                changeDBQuantityFn={changeDBQuantity}
            />
        </div>
    );
}
