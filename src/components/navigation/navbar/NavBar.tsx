import { Link } from "react-router-dom";
import PAGES from "../../../constants/pages";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/userStore/userSlice";
import { resetCart } from "../../../store/cartStore/cartSlice";
import { RootState } from "../../../store/store";

export default function NavBar() {
    const user = useSelector((state: RootState) => state.user.isSignedIn);

    const dispatch = useDispatch();

    // reset stores on logout
    function logout() {
        dispatch(signOut());
        dispatch(resetCart());
    }

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
                    <Link to={PAGES.CART}>Cart</Link>
                </li>

                {user ? (
                    <li>
                        <Link to={"#"} onClick={logout}>
                            Sign Out
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to={PAGES.SIGNIN}>Sign In</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
