import { ReactNode } from "react";

import styles from "../CartItemList.module.css";

export default function Price({ children }: { children: ReactNode }) {
    return <div className={styles.cart_item__price}>${children}</div>;
}
