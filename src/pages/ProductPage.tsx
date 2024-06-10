import { useParams } from "react-router-dom";

export default function ProductPage() {
    const { productId } = useParams();
    return <div>{productId}</div>;
}
