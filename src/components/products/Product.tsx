import { ReactNode } from "react";
import BlackStar from "../../assets/icons/star-black.png";

import styles from "./Product.module.css";
import { Link } from "react-router-dom";

export default function Product({
    children,
    productId,
}: {
    children: ReactNode;
    productId: number;
}) {
    return (
        <div className={styles.product_item}>
            <Link to={`/products/${productId}`}>{children}</Link>
        </div>
    );
}

Product.Title = function Title({ children }: { children: ReactNode }) {
    return <span className={styles.product_title}>{children}</span>;
};

Product.Price = function Price({ children }: { children: ReactNode }) {
    return <span>$ {children}</span>;
};

Product.Category = function Category({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Description = function Description({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Image = function Image({ source, title }: { source: string; title: string }) {
    return (
        <div className={styles.product_image__container}>
            <img className={styles.product_image} src={source} alt={title} />
        </div>
    );
};

Product.Rating = function Rating({ rate, count }: { rate: number; count: number }) {
    return (
        <div className={styles.product_item_rating__main}>
            <div className={styles.product_item__rating__container}>
                <img className={styles.product_item__rating__star} src={BlackStar} />
                <span>{rate}</span>
            </div>
            <span>Sold: {count}</span>
        </div>
    );
};
