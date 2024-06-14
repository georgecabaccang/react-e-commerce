import Button from "../../buttons/Button";
import Input from "../Input";

import styles from "./QuantityBox.module.css";

export default function QuantityBox({
    quantity,
    increase,
    decrease,
    changeQuantity,
}: {
    quantity: string;
    increase: () => void;
    decrease: () => void;
    changeQuantity: (value: string) => void;
}) {
    return (
        <div className={styles.quantity_box__container}>
            <div className={styles.quantity_box__button}>
                <Button
                    type="button"
                    name="add_quantity"
                    disabled={+quantity < 2 ? true : false}
                    clickFunction={decrease}
                    backgroundcolor={"bg-white"}
                    height="h-small"
                >
                    -
                </Button>
            </div>
            <div className={styles.quantity_box__input}>
                <Input
                    placeholder={quantity}
                    value={quantity}
                    onChangeFunction={changeQuantity}
                    name="product_quantity"
                    type="input"
                    center
                    height="h-small"
                />
            </div>
            <div className={styles.quantity_box__button}>
                <Button
                    type="button"
                    name="add_quantity"
                    disabled={+quantity > 99 ? true : false}
                    clickFunction={increase}
                    backgroundcolor={"bg-white"}
                    height="h-small"
                >
                    +
                </Button>
            </div>
        </div>
    );
}
