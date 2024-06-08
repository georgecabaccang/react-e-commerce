import { IProducts } from "../../pages/Store";

export default function ProductList({ products }: { products: IProducts[] }) {
    return (
        <ul>
            {products.map((product) => {
                return product.title;
            })}
        </ul>
    );
}
