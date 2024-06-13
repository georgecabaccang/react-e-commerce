import { ReactNode } from "react";

import thumbStyles from "../Product.module.css";
import detailStyles from "../ProductDetails.module.css";
export default function Category({
    children,
    isDetailsPage,
}: {
    children: ReactNode;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;
    return <div className={styles.product_category}>{children}</div>;
}
