import { useEffect, useState } from "react";
import URLS from "../constants/urls";
import ProductList from "../components/products/ProductList";
import useAPIRequest from "../hooks/services/useAPIRequest";

export interface IProducts {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function Store() {
    const [products, setProducts] = useState<IProducts[] | null>(null);

    const { request, isLoading, data } = useAPIRequest();

    useEffect(() => {
        if (products) return;
        if (isLoading) return;
        request(URLS.GET, URLS.FAKE_PRODUCTS_BASE, "/");
    }, [isLoading, products, request]);

    useEffect(() => {
        if (!data) return;
        const loadedProducts = data as unknown as IProducts[];
        setProducts(loadedProducts);
    }, [data]);

    if (!products) return "Loading";

    return <ProductList products={products} />;
}
