import { IProducts } from "../../pages/Store";
import Product from "./Product";

import styles from "./ProductList.module.css";

export default function ProductList({ products }: { products: IProducts[] }) {
    return (
        <ul className={styles.list}>
            {products.map((product, index) => {
                return (
                    <Product key={index} productId={product.id}>
                        <Product.Image
                            isDetailsPage={false}
                            source={product.image}
                            title={product.title}
                        />
                        <Product.Title isDetailsPage={false}>{product.title}</Product.Title>
                        <Product.Price isDetailsPage={false}>
                            {product.price.toFixed(2)}
                        </Product.Price>
                        <Product.Rating
                            isDetailsPage={false}
                            rate={product.rating.rate}
                            count={product.rating.count}
                        />
                    </Product>
                );
            })}
        </ul>
    );
}
