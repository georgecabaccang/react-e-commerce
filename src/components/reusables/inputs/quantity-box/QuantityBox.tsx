import useQuantityChanger from "../../../../hooks/helpers/useQuantityChanger";
import Button from "../../buttons/Button";
import Input from "../Input";

import styles from "./QuantityBox.module.css";

export default function QuantityBox({
    confirmQuantityFn,
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
}: {
    confirmQuantityFn: (quantity: number) => void;
    lowerLimit: number;
    higherLimit: number;
    submitButtonWidht?: string;
    quantityButtonWidht?: string;
    inputWidht?: string;
    height?: string;
    quantityButtonColor?: string;
    submitButtonColor?: string;
    fontWeight?: string;
    quantityButtonFontColor: string;
    submitButtonFontColor: string;
}) {
    const { quantity, increaseQuantity, decreaseQuantity, changeQuantity } = useQuantityChanger();

    const setHeight = height ? height : "h-small";
    const setQuantityButtonColor = quantityButtonColor ? quantityButtonColor : "bg-white";
    const setSubmitButtonColor = submitButtonColor ? submitButtonColor : "bg-white";

    return (
        <>
            <div className={styles.quantity_box__container}>
                <Button
                    type="button"
                    name="add_quantity"
                    clickFunction={() => {
                        +quantity === lowerLimit ? null : decreaseQuantity();
                    }}
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
                    onChangeFunction={changeQuantity}
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
                    clickFunction={() => {
                        +quantity === higherLimit ? null : increaseQuantity();
                    }}
                    backgroundcolor={setQuantityButtonColor}
                    height={setHeight}
                    widht={quantityButtonWidht}
                    fontWeight={fontWeight}
                    fontColor={quantityButtonFontColor}
                >
                    +
                </Button>

                <Button
                    type="submit"
                    name="submit_quantity"
                    clickFunction={() => confirmQuantityFn(+quantity)}
                    backgroundcolor={setSubmitButtonColor}
                    height={setHeight}
                    widht={submitButtonWidht}
                    fontColor={submitButtonFontColor}
                    fontWeight={fontWeight}
                    disabled={+quantity < lowerLimit || +quantity > higherLimit ? true : false}
                >
                    Add To Cart
                </Button>
            </div>
            <div>
                <span className="text-[0.7rem] text-slate-700">
                    Minimum is {lowerLimit} and maximum is {higherLimit}
                </span>
            </div>
        </>
    );
}
