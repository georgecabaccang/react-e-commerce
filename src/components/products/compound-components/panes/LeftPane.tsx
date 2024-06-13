import { ReactNode } from "react";
import thumbStyles from "../../Product.module.css";
import detailStyles from "../../ProductDetails.module.css";

export default function LeftPane({
    children,
    isDetailsPage,
}: {
    children: ReactNode;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;

    return <div className={styles.product_pane__left}>{children}</div>;
}
