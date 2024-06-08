import axios, { AxiosError } from "axios";
import { IUser, userSignedIn } from "../../store/userStore/userSlice";
import { useDispatch } from "react-redux";
import URLS from "../../constants/urls";

const useSignIn = () => {
    const dispatch = useDispatch();

    const signInUser = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(URLS.SEVER_USER_SIGN_IN, {
                email: email,
                password: password,
            });
            const user = data.data as IUser;

            dispatch(userSignedIn(user));
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    };
    return signInUser;
};

export default useSignIn;
