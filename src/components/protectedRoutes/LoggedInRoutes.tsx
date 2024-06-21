import { Outlet } from "react-router-dom";
import SignIn from "../../pages/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function LoggedInRoutes() {
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

    return isSignedIn ? <Outlet /> : <SignIn />;
}
