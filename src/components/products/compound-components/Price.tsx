import { ReactNode } from "react";

import thumbStyles from "../Product.module.css";
import detailStyles from "../ProductDetails.module.css";

export default function Price({
    children,
    isDetailsPage,
}: {
    children: ReactNode;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;

    return <span className={styles.product_price}>$ {children}</span>;
}
