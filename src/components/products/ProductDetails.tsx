import { useSelector } from "react-redux";
import TAILWIND_CONTANTS from "../../constants/tailwind";
import useAddToCart from "../../hooks/wrapers/cart/useAddToCart";
import { IProducts } from "../../pages/Store";
import QuantityBox from "../reusables/inputs/quantity-box/QuantityBox";
import Product from "./Product";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";

export default function ProductDetails({ product }: { product: IProducts }) {
    const cart = useSelector((state: RootState) => state.cart.items);
    const [isInCart, setIsInCart] = useState(false);
    const { addToCart } = useAddToCart();

    // checks if item/product is alredy in cart to
    // hide/diable quanity feature if true
    function checkIfInCart() {
        const indexOfItem = cart.findIndex((item) => item._id === product._id);
        if (indexOfItem >= 0) return setIsInCart(true);
        
        // set isInCart state to true
        setIsInCart(false);
    }

    function handleAddToCart(quantity: number) {
        addToCart({
            _id: product._id,
            quantity: quantity,
        });
    }

    useEffect(() => {
        checkIfInCart();
        return () => {};
    }, []);

    return (
        <Product productId={product._id} isDetailsPage={true}>
            <Product.LeftPane isDetailsPage={true}>
                <Product.Image isDetailsPage={true} source={product.image} title={product.title} />
            </Product.LeftPane>

            <Product.RightPane isDetailsPage={true}>
                <Product.GroupOne isDetailsPage={true}>
                    <Product.Title isDetailsPage={true}>{product.title}</Product.Title>
                    {/* Comment in below if category is now supplied */}
                    {/* <Product.Category isDetailsPage={true}>
                        {product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}
                    </Product.Category> */}
                </Product.GroupOne>

                <Product.GroupTwo isDetailsPage={true}>
                    <Product.Price isDetailsPage={true}>{product.price}</Product.Price>
                    <Product.Rating
                        isDetailsPage={true}
                        rate={product.rating}
                        count={product.rating}
                    />
                </Product.GroupTwo>

                <Product.GroupThree isDetailsPage={true}>
                    {!isInCart ? (
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
                            inCart
                        />
                    ) : (
                        "Already In Cart"
                    )}
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
