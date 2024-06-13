import TAILWIND_CONTANTS from "../../../../constants/tailwind";
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
                <Button
                    type="button"
                    name="add_quantity"
                    disabled={disabled}
                    backgroundcolor={TAILWIND_CONTANTS.BG_LIGHT_GRAY}
                >
                    -
                </Button>
            </div>
            <div className={styles.quantity_box__input}>
                <Input
                    placeholder="1"
                    value={quantity}
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
                    disabled={disabled}
                    backgroundcolor={TAILWIND_CONTANTS.BG_LIGHT_GRAY}
                >
                    +
                </Button>
            </div>
        </div>
    );
}
