import { ReactNode } from "react";

import styles from "../CartItemList.module.css";

export default function Title({ children }: { children: ReactNode }) {
    return <div className={styles.cart_item__title}>{children}</div>;
}
