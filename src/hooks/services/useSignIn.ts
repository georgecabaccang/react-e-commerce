import axios, { AxiosError } from "axios";
import { IUser, userSignedIn } from "../../store/userStore/userSlice";
import { useDispatch, useSelector } from "react-redux";
import URLS from "../../constants/urls";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PAGES from "../../constants/pages";

const useSignIn = () => {
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/${PAGES.STORE}`, { replace: true });
    }, [isSignedIn, navigate]);

    const signInUser = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(URLS.SEVER_USER_SIGN_IN, {
                email: email,
                password: password,
            });
            const user = data.data as IUser;
            
            dispatch(userSignedIn(user));
            return user;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    };
    return signInUser;
};

export default useSignIn;
