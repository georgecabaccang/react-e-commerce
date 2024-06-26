import { useCallback, useState } from "react";

const useQuantityChanger = (lowerLimit: number, higherLimit: number) => {
    const [quantity, setQuantity] = useState(1);

    function increaseQuantity() {
        quantity > higherLimit - 1 ? null : setQuantity((prev) => prev + 1);
    }

    function decreaseQuantity() {
        quantity < lowerLimit + 1 ? null : setQuantity((prev) => prev - 1);
    }

    const changeQuantity = useCallback(
        (amountEntered: string) => {
            if (+amountEntered < lowerLimit) {
                return setQuantity(lowerLimit);
            }
            if (+amountEntered > higherLimit) {
                return setQuantity(higherLimit);
            }
            setQuantity(+amountEntered);
        },
        [setQuantity, lowerLimit, higherLimit]
    );

    return {
        quantity: quantity.toString(),
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
    };
};

export default useQuantityChanger;
