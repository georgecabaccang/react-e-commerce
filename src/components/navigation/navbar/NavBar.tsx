import { Link } from "react-router-dom";
import PAGES from "../../../constants/pages";
import styles from "./navbar.module.css";

export default function NavBar() {
    return (
        <nav>
            <ul className={styles.navbar_list}>
                <li>
                    <Link to={PAGES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={PAGES.STORE}>Store</Link>
                </li>
                <li>
                    <Link to={PAGES.SIGNIN}>Sign In</Link>
                </li>
            </ul>
        </nav>
    );
}
