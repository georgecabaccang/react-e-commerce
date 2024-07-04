export default function ItemTotal({ quantity, price }: { quantity: number; price: number }) {
    const total = quantity * price;

    return <span>${total.toFixed(2)}</span>;
}
