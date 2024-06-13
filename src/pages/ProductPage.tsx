import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProducts } from "./Store";
import useGetRequest from "../hooks/services/useGetRequest";
import URLS from "../constants/urls";
import Product from "../components/products/Product";

export default function ProductPage() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState<IProducts | null>(null);

    const getProduct = useGetRequest();

    const loadProduct = useCallback(async () => {
        const loadedProduct = await getProduct(`${URLS.STORE_SINGLE_PRODUCT}${productId}`);
        setProductDetails(loadedProduct);
    }, [getProduct, productId]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    if (!productDetails) return "Loading";

    return (
        <Product productId={productDetails.id}>
            <Product.Image source={productDetails.image} title={productDetails.title} />
            <Product.Title isDetailsPage={true}>{productDetails.title}</Product.Title>
            <Product.Price>{productDetails.price.toFixed(2)}</Product.Price>
            <Product.Description>{productDetails.description}</Product.Description>
            <Product.Category>{productDetails.category}</Product.Category>
            <Product.Rating rate={productDetails.rating.rate} count={productDetails.rating.count} />
        </Product>
    );
}
