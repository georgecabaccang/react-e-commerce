import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/modalStore/modalSlice";
import styles from "./refreshModal.module.css";
import { RootState } from "../../../store/store";
import useAPIRequest from "../../../hooks/services/useAPIRequest";
import URLS from "../../../constants/urls";
import { useEffect } from "react";
import { signOut } from "../../../store/userStore/userSlice";
import { resetCart } from "../../../store/cartStore/cartSlice";

const Modal = () => {
    const { request, data } = useAPIRequest();

    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();

    function handeRefreshToken() {
        request(URLS.POST, URLS.SERVER_BASE, URLS.REFRESH_TOKEN);
    }

    function handleSignOut() {
        request(URLS.POST, URLS.SERVER_BASE, URLS.USER_SIGN_OUT);
        dispatch(signOut());
        dispatch(resetCart());
    }

    useEffect(() => {
        if (data?.data?.token) {
            localStorage.setItem("userToken", data?.data?.token);
        }
        dispatch(closeModal());
    }, [data]);

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <p>Token has expired. Refresh?</p>
                <div className={styles.modal_button__container}>
                    <button className={styles.modal_button} onClick={() => handeRefreshToken()}>
                        Yes
                    </button>
                    <button className={styles.modal_button} onClick={() => handleSignOut()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
