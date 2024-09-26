import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import PAGES from "./constants/pages";
import NavBar from "./components/navigation/navbar/NavBar";
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
import Modal from "./components/reusables/modals/RefreshModal";
// import ProductPage from "./pages/ProductPage";

const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Registration = lazy(() => import("./pages/Registration"));
const LoggedInRoutes = lazy(() => import("./components/protectedRoutes/LoggedInRoutes"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
    // const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

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
