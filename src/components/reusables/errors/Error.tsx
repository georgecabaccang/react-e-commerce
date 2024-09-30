import styles from "./Errors.module.css";

export default function Errors({ error }: { error: string | null }) {
    return (
        <div className={styles.container}>
            <span className={styles.error_message}>{error}</span>
        </div>
    );
}
