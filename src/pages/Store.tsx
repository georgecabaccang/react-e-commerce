import { useEffect, useState } from "react";
import URLS from "../constants/urls";
import ProductList from "../components/products/ProductList";
import useAPIRequest from "../hooks/services/useAPIRequest";

export interface IProducts {
    _id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
}

export default function Store() {
    const [products, setProducts] = useState<IProducts[] | null>(null);

    const { request, isLoading, data } = useAPIRequest();

    useEffect(() => {
        // return if products have already been retrieved from db
        if (products) return;

        // return if still loading to avoid multiple requests
        if (isLoading) return;

        // request for products
        request(URLS.GET, URLS.PRODUCTS_BASE, "/");
    }, [isLoading, products, request]);

    useEffect(() => {
        // if data is yet to be receieved, return to avoid "undefined" or "null" errors
        if (!data) return;
        const loadedProducts = data as unknown as IProducts[];

        // update state for products
        setProducts(loadedProducts);
    }, [data]);

    if (!products) return "Loading";

    return <ProductList products={products} />;
}
