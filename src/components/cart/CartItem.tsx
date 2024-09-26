import { useEffect, useState } from "react";
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
import Button from "../reusables/buttons/Button";
import useRemoveFromCart from "../../hooks/wrapers/cart/useRemoveFromCart";

export default function CartItem({ item }: { item: IItem }) {
    const [itemDetails, setItemDetails] = useState<IItem | null>(null);

    const { request, isLoading, data } = useAPIRequest();
    const { removeItem } = useRemoveFromCart();

    const removeFromCart = () => {
        removeItem(item._id);
    };

    // gets products details from database for consistency of products in cart and DB
    useEffect(() => {
        // return if isLoading is true to avoid multiple requests
        if (isLoading) return;
        // return if data is already retrieved to avoid multiple requests
        if (data) return;
        // make a request for product details
        request(URLS.GET, URLS.PRODUCTS_BASE, item._id);
    }, [isLoading, item._id, request, data]);

    useEffect(() => {
        // return if isLoading is true to avoid multiple requests
        if (isLoading) return;
        // return if data is null or undefined to avoid bugs and error
        if (!data) return;
        // type cast data for auto completion
        const itemDetailsReponse = data as unknown as IItem;
        // set item details to state
        setItemDetails(itemDetailsReponse);
    }, [data, isLoading]);

    if (!itemDetails || isLoading) {
        return "Loading...";
    }

    return (
        <div className={styles.cart_item}>
            <CartItem.LeftPane>
                <CartItem.Image source={itemDetails.image} title={itemDetails.title} />
            </CartItem.LeftPane>
            <CartItem.RightPane>
                <CartItem.Title>{itemDetails.title}</CartItem.Title>
                <CartItem.Price>{itemDetails.price}</CartItem.Price>
                <CartItem.Quantity
                    quantity={item.quantity}
                    item={itemDetails}
                    lowerLimit={1}
                    higherLimit={100}
                />
            </CartItem.RightPane>
            <Button
                name="remove_item"
                type="button"
                children={"X"}
                clickFunction={removeFromCart}
            />
        </div>
    );
}

CartItem.Title = Title;
CartItem.Price = Price;
CartItem.Quantity = Quantity;
CartItem.Image = Image;

CartItem.LeftPane = LeftPane;
CartItem.RightPane = RightPane;
