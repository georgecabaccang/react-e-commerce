import styles from "../CartItemList.module.css";
import QuantityBox from "../../reusables/inputs/quantity-box/QuantityBox";
import { IItem } from "../../../store/cartStore/cartSlice";
import useChangeQuantity from "../../../hooks/wrapers/cart/useChangeQuantity";

export default function Quantity({
    quantity,
    item,
    lowerLimit,
    higherLimit,
}: {
    quantity: number;
    item: IItem;
    lowerLimit: number;
    higherLimit: number;
}) {
    const { newQuantity, changeQuantity } = useChangeQuantity();

    async function changeDBQuantity(quantity: number) {
        console.log(newQuantity);
        // if (newQuantity < lowerLimit || newQuantity > higherLimit) return;
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
                lowerLimit={lowerLimit}
                higherLimit={higherLimit}
                currentQuantity={newQuantity ? newQuantity : quantity}
                changeDBQuantityFn={changeDBQuantity}
            />
        </div>
    );
}
