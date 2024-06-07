import axios, { AxiosError } from "axios";
import { IUser, userSignedIn } from "../store/userStore/userSlice";
import { useDispatch } from "react-redux";

const useSignIn = () => {
    const dispatch = useDispatch();

    const signInUser = async (email: string, password: string) => {
        try {
            const { data } = await axios.post("http://localhost:8002/user/sign-in", {
                email: email,
                password: password,
            });
            const user = data.data as IUser;

            dispatch(userSignedIn(user));
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };
    return signInUser;
};

export default useSignIn;
