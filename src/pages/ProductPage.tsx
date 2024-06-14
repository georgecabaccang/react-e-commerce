import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProducts } from "./Store";
import useGetRequest from "../hooks/services/useGetRequest";
import URLS from "../constants/urls";
import ProductDetails from "../components/products/ProductDetails";

export default function ProductPage() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState<IProducts | null>(null);

    const getProduct = useGetRequest();

    const loadProduct = useCallback(async () => {
        if (productDetails) return;
        const loadedProduct = await getProduct(`${URLS.STORE_SINGLE_PRODUCT}${productId}`);
        setProductDetails(loadedProduct);
    }, [getProduct, productId, productDetails]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    if (!productDetails) return "Loading";

    return <ProductDetails product={productDetails} />;
}
