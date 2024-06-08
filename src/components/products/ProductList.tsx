import { IProducts } from "../../pages/Store";
import Product from "./Product";

import styles from "./ProductList.module.css";

export default function ProductList({ products }: { products: IProducts[] }) {
    return (
        <ul className={styles.list}>
            {products.map((product) => {
                return (
                    <Product>
                        <Product.Image source={product.image} title={product.title} />
                        <Product.Title>{product.title}</Product.Title>
                        <Product.Price>{product.price}</Product.Price>
                        <Product.Description>{product.description}</Product.Description>
                        <Product.Category>{product.category}</Product.Category>
                        <Product.Rating rate={product.rating.rate} count={product.rating.count} />
                    </Product>
                );
            })}
        </ul>
    );
}
