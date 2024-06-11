import { IProducts } from "../../pages/Store";
import Product from "./Product";

import styles from "./ProductList.module.css";

export default function ProductList({ products }: { products: IProducts[] }) {
    return (
        <ul className={styles.list}>
            {products.map((product, index) => {
                return (
                    <Product key={index} productId={product.id}>
                        <Product.Image source={product.image} title={product.title} />
                        <Product.Title>{product.title}</Product.Title>
                        <Product.Price>{product.price.toFixed(2)}</Product.Price>
                        <Product.Rating rate={product.rating.rate} count={product.rating.count} />
                    </Product>
                );
            })}
        </ul>
    );
}
