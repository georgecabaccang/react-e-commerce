import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProducts } from "./Store";
import useAPIRequest from "../hooks/services/useAPIRequest";
import URLS from "../constants/urls";
import ProductDetails from "../components/products/ProductDetails";

export default function ProductPage() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState<IProducts | null>(null);

    const { request, abort } = useAPIRequest();

    const loadProduct = useCallback(async () => {
        if (productDetails) return;
        const loadedProduct = await request(
            URLS.GET,
            URLS.FAKE_PRODUCTS_BASE,
            productId!.toString()
        );
        setProductDetails(loadedProduct);
    }, [request, productId, productDetails]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    useEffect(() => {
        return () => abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!productDetails) return "Loading";

    return <ProductDetails product={productDetails} />;
}
