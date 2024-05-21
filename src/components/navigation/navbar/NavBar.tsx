import { Link } from "react-router-dom";
import PAGES from "../../../constants/pages";
import styles from "./navbar.module.css";

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <Link to={PAGES.HOME} className={styles.logo}>
                Logo For Home
            </Link>
            <ul className={styles.navbar_list}>
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
