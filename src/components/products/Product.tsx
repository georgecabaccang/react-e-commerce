import { ReactNode } from "react";

import styles from "./Product.module.css";

export default function Product({ children }: { children: ReactNode }) {
    return <div className={styles.product_item}>{children}</div>;
}

Product.Title = function Title({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Price = function Price({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Category = function Category({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Description = function Description({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
};

Product.Image = function Image({ source, title }: { source: string; title: string }) {
    return <img className={styles.product_image} src={source} alt={title} />;
};

Product.Rating = function Rating({ rate, count }: { rate: number; count: number }) {
    return (
        <>
            <div>{rate}</div>
            <div>{count}</div>
        </>
    );
};
