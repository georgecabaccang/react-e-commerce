import thumbStyles from "../Product.module.css";
import detailStyles from "../ProductDetails.module.css";

export default function Image({
    source,
    title,
    isDetailsPage,
}: {
    source: string;
    title: string;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;
    return (
        <div className={styles.product_image__container}>
            <img className={styles.product_image} src={source} alt={title} />
        </div>
    );
}
