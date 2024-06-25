import { useCallback, useState } from "react";

const useQuantityChanger = () => {
    const [quantity, setQuantity] = useState(1);

    function increaseQuantity() {
        setQuantity((prev) => prev + 1);
    }

    function decreaseQuantity() {
        setQuantity((prev) => prev - 1);
    }

    const changeQuantity = useCallback(
        (amountEntered: string) => {
            setQuantity(+amountEntered);
        },
        [setQuantity]
    );

    return {
        quantity: quantity.toString(),
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
    };
};

export default useQuantityChanger;
