import { useCallback, useEffect, useState } from "react";
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

    const request = useAPIRequest();

    const getProducts = useCallback(async () => {
        if (products) return;
        const loadedProducts = await request(URLS.GET, URLS.FAKE_PRODUCTS_BASE, "/");
        return setProducts(loadedProducts);
    }, [request, setProducts, products]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    if (!products) return "Loading";

    return <ProductList products={products} />;
}
