import styles from "../CartItemList.module.css";
import QuantityBox from "../../reusables/inputs/quantity-box/QuantityBox";
import { IItem } from "../../../store/cartStore/cartSlice";
import useChangeQuantity from "../../../hooks/wrapers/cart/useChangeQuantity";
import { useCallback } from "react";
import TAILWIND_CONTANTS from "../../../constants/tailwind";

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

    const changeDBQuantity = useCallback(
        async (quantity: number) => {
            if (quantity < lowerLimit || quantity > higherLimit) return;
            await changeQuantity({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: quantity,
            });
        },
        [changeQuantity, item, lowerLimit, higherLimit]
    );

    return (
        <div className={styles.cart_item__quantity}>
            <span>Quantity:</span>
            <QuantityBox
                lowerLimit={lowerLimit}
                higherLimit={higherLimit}
                currentQuantity={newQuantity ? newQuantity : quantity}
                changeDBQuantityFn={changeDBQuantity}
                height={TAILWIND_CONTANTS.height.xs}
                quantityButtonColor={TAILWIND_CONTANTS.backGroundColors.gray}
                quantityButtonWidht={TAILWIND_CONTANTS.width.xs}
                inputWidht={TAILWIND_CONTANTS.width.short}
            />
        </div>
    );
}
