import { ReactNode } from "react";

import thumbStyles from "./Product.module.css";
import detailStyles from "./ProductDetails.module.css";

import { Link } from "react-router-dom";
import Title from "./compound-components/Title";
import Price from "./compound-components/Price";
import Image from "./compound-components/Image";
import Category from "./compound-components/Category";
import Description from "./compound-components/Description";
import Rating from "./compound-components/Rating";
import GroupOne from "./compound-components/groups/GroupOne";
import GroupTwo from "./compound-components/groups/GroupTwo";
import GroupThree from "./compound-components/groups/GroupThree";
import LeftPane from "./compound-components/panes/LeftPane";
import RightPane from "./compound-components/panes/RightPane";
import GroupFour from "./compound-components/groups/GroupFour";

export default function Product({
    children,
    productId,
    isDetailsPage,
}: {
    children: ReactNode;
    productId: string;
    isDetailsPage: boolean;
}) {
    const styles = isDetailsPage ? detailStyles : thumbStyles;
    return (
        <div className={styles.product_item_container}>
            {isDetailsPage ? (
                <div className={styles.product_item}>{children}</div>
            ) : (
                <Link to={`/products/${productId}`}>
                    <div className={styles.product_item}>{children}</div>
                </Link>
            )}
        </div>
    );
}

Product.Title = Title;
Product.Price = Price;
Product.Category = Category;
Product.Description = Description;
Product.Image = Image;
Product.Rating = Rating;

Product.LeftPane = LeftPane;
Product.RightPane = RightPane;

Product.GroupOne = GroupOne;
Product.GroupTwo = GroupTwo;
Product.GroupThree = GroupThree;
Product.GroupFour = GroupFour;
