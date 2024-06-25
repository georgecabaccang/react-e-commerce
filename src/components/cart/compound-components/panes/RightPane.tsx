import { ReactNode } from "react";

import styles from "../../CartItemList.module.css";

export default function RightPane({ children }: { children: ReactNode }) {
    return <div className={styles.cart_item__pane_right}>{children}</div>;
}
