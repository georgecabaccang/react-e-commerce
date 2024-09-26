import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import PAGES from "./constants/pages";
import NavBar from "./components/navigation/navbar/NavBar";

import Modal from "./components/reusables/modals/RefreshModal";
import useAPIRequest from "./hooks/services/useAPIRequest";
import URLS from "./constants/urls";
import { useDispatch } from "react-redux";
import { userSignedIn } from "./store/userStore/userSlice";

const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Registration = lazy(() => import("./pages/Registration"));
const LoggedInRoutes = lazy(() => import("./components/protectedRoutes/LoggedInRoutes"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
    const [token, setToken] = useState<string | null>(null);
    const { request, data } = useAPIRequest();
    const dispatch = useDispatch();

    useEffect(() => {
        // get from local storage on app load
        const loadedToken = localStorage.getItem("userToken");

        // set to state if not null
        loadedToken && setToken(loadedToken);
    }, []);

    useEffect(() => {
        // if token is available, get a new cookie and token via refreshing
        if (token) {
            request(URLS.POST, URLS.SERVER_BASE, URLS.REFRESH_TOKEN);
        }
    }, [token]);

    useEffect(() => {
        // when user data is retrieved, set user state store that user is logged in
        if (data) {
            dispatch(userSignedIn(data.data));
        }
    }, [data]);

    return (
        <div className="view_port_container">
            <Modal />
            <NavBar />
            <div className="content_container">
                <Suspense fallback={"Loading..."}>
                    <Routes>
                        <Route path={PAGES.HOME} element={<Home />} />
                        <Route element={<LoggedInRoutes />}>
                            <Route path={`/${PAGES.STORE}`} element={<Store />} />
                            <Route
                                path={`/${PAGES.PRODUCT}/:productId`}
                                element={<ProductPage />}
                            />
                            <Route path={`/${PAGES.CART}`} element={<Cart />} />
                        </Route>
                        <Route path={`/${PAGES.SIGNIN}`} element={<SignIn />} />
                        <Route path={`/${PAGES.REGISTRATION}`} element={<Registration />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;
