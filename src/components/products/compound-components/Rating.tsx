import BlackStar from "../../../assets/icons/star-black.png";
import Stars from "../../reusables/layouts/Stars";

import thumbStyles from "../Product.module.css";
import detailStyles from "../ProductDetails.module.css";

export default function Rating({
    rate,
    count,
    isDetailsPage,
}: {
    rate: number;
    count: number;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;

    return (
        <div className={styles.product_item_rating__main}>
            <div className={styles.product_item__rating__container}>
                {!isDetailsPage ? (
                    <img className={styles.product_item__rating__star} src={BlackStar} />
                ) : (
                    <Stars maxRating={5} ratingOfProduct={rate} />
                )}
                <span>{rate}</span>
            </div>
            <span className={styles.product_rating__count}>{count} reviews</span>
        </div>
    );
}
