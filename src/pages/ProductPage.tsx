import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProducts } from "./Store";
import useAPIRequest from "../hooks/services/useAPIRequest";
import URLS from "../constants/urls";
import ProductDetails from "../components/products/ProductDetails";

export default function ProductPage() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState<IProducts | null>(null);

    const { request, isLoading, data } = useAPIRequest();

    useEffect(() => {
        if (productDetails) return;
        if (isLoading) return;
        request(URLS.GET, URLS.PRODUCTS_BASE, productId!.toString());
    }, [productDetails, productId, request, isLoading]);

    useEffect(() => {
        const loaddedProductDetails = data as unknown as IProducts;
        setProductDetails(loaddedProductDetails);
    }, [data]);

    if (!productDetails || isLoading) return "Loading";

    return <ProductDetails product={productDetails} />;
}
