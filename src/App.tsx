import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import PAGES from "./constants/pages";
import NavBar from "./components/navigation/navbar/NavBar";

const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Registration = lazy(() => import("./pages/Registration"));

function App() {
    return (
        <>
            <NavBar />
            <Suspense fallback={"Loading..."}>
                <Routes>
                    <Route path={PAGES.HOME} element={<Home />} />
                    <Route path={`/${PAGES.STORE}`} element={<Store />} />
                    <Route path={`/${PAGES.SIGNIN}`} element={<SignIn />} />
                    <Route path={`/${PAGES.REGISTRATION}`} element={<Registration />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
