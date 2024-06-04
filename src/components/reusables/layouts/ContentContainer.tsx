import { ReactNode } from "react";

import styles from "./ContentContainer.module.css";
import Image from "../images/Image";

export default function ContentContainer({
    children,
    source,
    size,
    header,
    subheader,
}: {
    children: ReactNode;
    source?: string;
    size?: string;
    header?: string;
    subheader?: string;
}) {
    return (
        <div className={styles.main_container}>
            {/* Start of dummy containers */}
            <div className={styles.upper_parent_container}>
                <div className={styles.container_left}></div>
                <div className={styles.container_mid}></div>
                <div className={styles.container_right}></div>
            </div>
            {/* End of dummy containers */}

            {/* Start of Main Content */}
            <div className={styles.parent_container}>
                <div className={styles.container}></div>
                <div className={styles.main_content}>
                    <Image size={size} source={source} />
                    <h1 className={styles.header}>{header}</h1>
                    <h2 className={styles.subheader}>{subheader}</h2>
                    {children}
                </div>
                <div className={styles.container}></div>
            </div>
            {/* End of Main Content */}

            {/* Start of dummy containers */}
            <div className={styles.lower_parent_container}>
                <div className={styles.container_left}></div>
                <div className={styles.container_mid}></div>
                <div className={styles.container_right}></div>
            </div>
            {/* End of dummy containers */}
        </div>
    );
}
