import { ReactNode } from "react";
import thumbStyles from "../Product.module.css";
import detailStyles from "../ProductDetails.module.css";

export default function Title({
    children,
    isDetailsPage,
}: {
    children: ReactNode;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;

    return <span className={styles.product_title}>{children}</span>;
}
