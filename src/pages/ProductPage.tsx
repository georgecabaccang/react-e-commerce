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
        // reutrn if product details are already retrieved to avoid multiple requests
        if (productDetails) return;

        // reutrn isLoading is true to avoid multiple requests
        if (isLoading) return;

        // request for product details
        request(URLS.GET, URLS.PRODUCTS_BASE, productId!.toString());
    }, [productDetails, productId, request, isLoading]);

    useEffect(() => {
        const loaddedProductDetails = data as unknown as IProducts;
        setProductDetails(loaddedProductDetails);
    }, [data]);

    if (!productDetails || isLoading) return "Loading";

    return <ProductDetails product={productDetails} />;
}
