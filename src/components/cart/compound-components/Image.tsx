import styles from "../CartItemList.module.css";

export default function Image({ source, title }: { source: string; title: string }) {
    return (
        <div className={styles.cart_item__image}>
            <img src={source} alt={title} />
        </div>
    );
}
