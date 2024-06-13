import { IProducts } from "../../pages/Store";
import Product from "./Product";

export default function ProductDetails({ product }: { product: IProducts }) {
    return (
        <Product productId={product.id} isDetailsPage={true}>
            <Product.LeftPane isDetailsPage={true}>
                <Product.Image isDetailsPage={true} source={product.image} title={product.title} />
            </Product.LeftPane>

            <Product.RightPane isDetailsPage={true}>
                <Product.GroupOne isDetailsPage={true}>
                    <Product.Title isDetailsPage={true}>{product.title}</Product.Title>
                    <Product.Category isDetailsPage={true}>
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </Product.Category>
                </Product.GroupOne>

                <Product.GroupTwo isDetailsPage={true}>
                    <Product.Price isDetailsPage={true}>{product.price.toFixed(2)}</Product.Price>
                    <Product.Rating
                        isDetailsPage={true}
                        rate={product.rating.rate}
                        count={product.rating.count}
                    />
                </Product.GroupTwo>

                <Product.GroupThree isDetailsPage={true}>
                    <Product.Description isDetailsPage={true}>
                        {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
                    </Product.Description>
                </Product.GroupThree>
            </Product.RightPane>
        </Product>
    );
}
