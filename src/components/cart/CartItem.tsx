import { useCallback, useEffect, useState } from "react";
import Image from "./compound-components/Image";
import Price from "./compound-components/Price";
import Quantity from "./compound-components/Quantity";
import Title from "./compound-components/Title";
import useAPIRequest from "../../hooks/services/useAPIRequest";
import URLS from "../../constants/urls";
import LeftPane from "./compound-components/panes/LeftPane";
import RightPane from "./compound-components/panes/RightPane";

import styles from "./CartItemList.module.css";
import { IItem } from "../../store/cartStore/cartSlice";

export default function CartItem({ item }: { item: IItem }) {
    const [itemDetails, setItemDetails] = useState<IItem | null>(null);

    const request = useAPIRequest();

    const getItemDetails = useCallback(async () => {
        if (itemDetails) return;
        const response = await request(URLS.GET, URLS.FAKE_PRODUCTS_BASE, item.id.toString());
        setItemDetails(response);
    }, [request, item, itemDetails]);

    useEffect(() => {
        getItemDetails();
    }, [getItemDetails]);

    if (!itemDetails) {
        return "Loading...";
    }

    return (
        <div className={styles.cart_item}>
            <CartItem.LeftPane>
                <CartItem.Image source={itemDetails.image} title={itemDetails.title} />
            </CartItem.LeftPane>
            <CartItem.RightPane>
                <CartItem.Title>{itemDetails.title}</CartItem.Title>
                <CartItem.Price>{itemDetails.price.toFixed(2)}</CartItem.Price>
                <CartItem.Quantity
                    quantity={item.quantity}
                    item={item}
                    lowerLimit={1}
                    higherLimit={100}
                />
            </CartItem.RightPane>
        </div>
    );
}

CartItem.Title = Title;
CartItem.Price = Price;
CartItem.Quantity = Quantity;
CartItem.Image = Image;

CartItem.LeftPane = LeftPane;
CartItem.RightPane = RightPane;
