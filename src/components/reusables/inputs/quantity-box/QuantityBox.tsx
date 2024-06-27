import { ChangeEvent, useEffect } from "react";
import useQuantityChanger from "../../../../hooks/helpers/useQuantityChanger";
import Button from "../../buttons/Button";
import Input from "../Input";

import styles from "./QuantityBox.module.css";

export default function QuantityBox({
    confirmQuantityFn,
    changeDBQuantityFn,
    lowerLimit,
    higherLimit,
    height,
    quantityButtonColor,
    submitButtonColor,
    submitButtonWidht,
    quantityButtonWidht,
    inputWidht,
    fontWeight,
    quantityButtonFontColor,
    submitButtonFontColor,
    inCart,
    currentQuantity,
}: {
    confirmQuantityFn?: (quantity: number) => void;
    changeDBQuantityFn?: (quantity: number) => void;
    lowerLimit: number;
    higherLimit: number;
    submitButtonWidht?: string;
    quantityButtonWidht?: string;
    inputWidht?: string;
    height?: string;
    quantityButtonColor?: string;
    submitButtonColor?: string;
    fontWeight?: string;
    quantityButtonFontColor?: string;
    submitButtonFontColor?: string;
    inCart?: boolean;
    currentQuantity?: number;
}) {
    const { quantity, increaseQuantity, decreaseQuantity, changeQuantity } = useQuantityChanger(
        lowerLimit,
        higherLimit
    );

    function changeQuantityByOne(operation: "increase" | "decrease") {
        switch (operation) {
            case "increase":
                increaseQuantity();
                changeDBQuantityFn ? changeDBQuantityFn(+quantity + 1) : null;
                break;
            case "decrease":
                decreaseQuantity();
                changeDBQuantityFn ? changeDBQuantityFn(+quantity - 1) : null;
                break;
        }
    }

    useEffect(() => {
        if (currentQuantity) {
            changeQuantity(currentQuantity.toString());
        }
    }, [currentQuantity, changeQuantity]);

    const setHeight = height ? height : "h-small";
    const setQuantityButtonColor = quantityButtonColor ? quantityButtonColor : "bg-white";
    const setSubmitButtonColor = submitButtonColor ? submitButtonColor : "bg-white";

    return (
        <>
            <div className={styles.quantity_box__container}>
                <Button
                    type="button"
                    name="add_quantity"
                    clickFunction={() => changeQuantityByOne("decrease")}
                    backgroundcolor={setQuantityButtonColor}
                    height={setHeight}
                    widht={quantityButtonWidht}
                    fontWeight={fontWeight}
                    fontColor={quantityButtonFontColor}
                >
                    -
                </Button>

                <Input
                    placeholder={quantity}
                    value={quantity}
                    onChangeFunction={(event: ChangeEvent<HTMLInputElement>) => {
                        changeQuantity(event.target.value);
                        changeDBQuantityFn ? changeDBQuantityFn(+event.target.value) : null;
                    }}
                    name="product_quantity"
                    type="number"
                    center
                    height={setHeight}
                    width={inputWidht}
                    max={higherLimit}
                    min={lowerLimit}
                />

                <Button
                    type="button"
                    name="add_quantity"
                    clickFunction={() => changeQuantityByOne("increase")}
                    backgroundcolor={setQuantityButtonColor}
                    height={setHeight}
                    widht={quantityButtonWidht}
                    fontWeight={fontWeight}
                    fontColor={quantityButtonFontColor}
                >
                    +
                </Button>

                {inCart && (
                    <Button
                        type="submit"
                        name="submit_quantity"
                        clickFunction={() =>
                            confirmQuantityFn ? confirmQuantityFn(+quantity) : null
                        }
                        backgroundcolor={setSubmitButtonColor}
                        height={setHeight}
                        widht={submitButtonWidht}
                        fontColor={submitButtonFontColor}
                        fontWeight={fontWeight}
                        disabled={+quantity < lowerLimit || +quantity > higherLimit ? true : false}
                    >
                        Add To Cart
                    </Button>
                )}
            </div>
            <div>
                <span className="text-[0.7rem] text-slate-700">
                    Minimum is {lowerLimit} and maximum is {higherLimit}
                </span>
            </div>
        </>
    );
}
