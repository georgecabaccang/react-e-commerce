import { useEffect, useState } from "react";
import URLS from "../constants/urls";
import axios from "axios";

interface IProducts {
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

    async function getProducts() {
        const { data } = await axios.get(URLS.STORE_PRODUCTS);
        return setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return <div>Store</div>;
}
