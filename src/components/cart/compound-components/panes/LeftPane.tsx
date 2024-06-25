import { ReactNode } from "react";

import styles from "../../CartItemList.module.css";

export default function LeftPane({ children }: { children: ReactNode }) {
    return <div className={styles.cart_item__pane_left}>{children}</div>;
}
