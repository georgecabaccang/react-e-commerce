import { ReactNode } from "react";

import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import Title from "./compound-components/Title";
import Price from "./compound-components/Price";
import Image from "./compound-components/Image";
import Category from "./compound-components/Category";
import Description from "./compound-components/Description";
import Rating from "./compound-components/Rating";

export default function Product({
    children,
    productId,
}: {
    children: ReactNode;
    productId: number;
}) {
    return (
        <div className={styles.product_item_container}>
            <Link to={`/products/${productId}`}>
                <div className={styles.product_item}>{children}</div>
            </Link>
        </div>
    );
}

Product.Title = Title;
Product.Price = Price;
Product.Category = Category;
Product.Description = Description;
Product.Image = Image;

Product.Rating = Rating;
