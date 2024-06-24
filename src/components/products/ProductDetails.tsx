import TAILWIND_CONTANTS from "../../constants/tailwind";
import useAddToCart from "../../hooks/wrapers/cart/useAddToCart";
import { IProducts } from "../../pages/Store";
import QuantityBox from "../reusables/inputs/quantity-box/QuantityBox";
import Product from "./Product";

export default function ProductDetails({ product }: { product: IProducts }) {
    const addToCart = useAddToCart();

    function handleAddToCart(quantity: number) {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
        });
    }

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
                    <QuantityBox
                        lowerLimit={1}
                        higherLimit={100}
                        confirmQuantityFn={handleAddToCart}
                        quantityButtonColor={TAILWIND_CONTANTS.backGroundColors.white}
                        quantityButtonFontColor={TAILWIND_CONTANTS.fontColor.gray}
                        submitButtonFontColor={TAILWIND_CONTANTS.fontColor.white}
                        submitButtonWidht={TAILWIND_CONTANTS.width.extraLong}
                        quantityButtonWidht={TAILWIND_CONTANTS.width.short}
                        inputWidht={TAILWIND_CONTANTS.width.medium}
                        height={TAILWIND_CONTANTS.height.small}
                        fontWeight={TAILWIND_CONTANTS.fontSize.extraBold}
                        submitButtonColor={TAILWIND_CONTANTS.backGroundColors.gray}
                    />
                </Product.GroupThree>

                <Product.GroupFour isDetailsPage={true}>
                    <Product.Description isDetailsPage={true}>
                        {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
                    </Product.Description>
                </Product.GroupFour>
            </Product.RightPane>
        </Product>
    );
}
