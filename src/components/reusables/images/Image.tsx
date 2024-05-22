import SIZE from "../../../constants/images";
import styles from "./Image.module.css";

export default function Image({ source, size }: { source: string; size: string }) {
    let imageStyle;

    switch (size) {
        case SIZE.SMALL:
            imageStyle = styles.image_small;
            break;
        case SIZE.MEDIUM:
            imageStyle = styles.image_medium;
            break;
        case SIZE.LARGE:
            imageStyle = styles.image_large;
            break;
        default:
            imageStyle = styles.image_extra_large;
    }

    return <img src={source} className={imageStyle} />;
}
