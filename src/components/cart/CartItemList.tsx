import CartItem from "./CartItem";

import styles from "./CartItemList.module.css";
import { IItem } from "../../store/cartStore/cartSlice";

export default function CartItemList({ items }: { items: IItem[] }) {
    return (
        <div className={styles.cart_item__list}>
            {items
                .map((item, index) => {
                    return <CartItem key={index} item={item} />;
                })
                .reverse()}
        </div>
    );
}
