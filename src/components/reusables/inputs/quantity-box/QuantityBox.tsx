import Button from "../../buttons/Button";
import Input from "../Input";

import styles from "./QuantityBox.module.css";

export default function QuantityBox({
    quantity,
    disabled,
}: {
    quantity: string;
    disabled: boolean;
}) {
    return (
        <div className={styles.quantity_box__container}>
            <div className={styles.quantity_box__button}>
                <Button type="button" name="add_quantity" disabled={disabled}>
                    -
                </Button>
            </div>
            <div className={styles.quantity_box__input}>
                <Input placeholder="1" value={quantity} name="product_quantity" type="input" />
            </div>
            <div className={styles.quantity_box__button}>
                <Button type="button" name="add_quantity" disabled={disabled}>
                    +
                </Button>
            </div>
        </div>
    );
}
