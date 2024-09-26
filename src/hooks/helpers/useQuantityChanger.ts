import { useCallback, useState } from "react";

const useQuantityChanger = (lowerLimit: number, higherLimit: number) => {
    const [quantity, setQuantity] = useState(1);

    // increase state quanity by 1
    function increaseQuantity() {
        quantity > higherLimit - 1 ? null : setQuantity((prev) => prev + 1);
    }

    // decrease state quanity by 1
    function decreaseQuantity() {
        quantity < lowerLimit + 1 ? null : setQuantity((prev) => prev - 1);
    }

    const changeQuantity = useCallback(
        (amountEntered: string) => {
            // if amount entered by user is less than the lower limit, set quanity state to lower limit
            if (+amountEntered < lowerLimit) {
                return setQuantity(lowerLimit);
            }

            // if amount entered by user is greater than the higher limit, set quanity state to higher limit
            if (+amountEntered > higherLimit) {
                return setQuantity(higherLimit);
            }

            // else set quantity state to amount entered
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
