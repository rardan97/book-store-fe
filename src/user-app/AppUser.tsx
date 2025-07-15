import { Route, Routes } from "react-router";
import SignIn from "./pages/AuthPage/SignIn";
import SignUp from "./pages/AuthPage/SignUp";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import BooksPage from "./pages/BooksPage";
import AboutPage from "./pages/AboutPage";
import BuyNowPage from "./pages/BuyNowPage";
import { AuthProviderUser } from "./context/AuthContextUser";
import LogoutButton from "./components/auth/LogoutButton";
import PrivateRoute from "./utils/PrivateRoute";



const AppUser = () => {
    return (
        <> 
            <AuthProviderUser>      
            <Routes>
                <Route path="/signin" element={<SignIn />} ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                {/* <Route path="/logout" element={<LogoutButton />} ></Route> */}
                <Route path="/" element={
                // <PrivateRoute>
                    <AppLayout />
                // </PrivateRoute>
                } >
                    <Route index element={<Home />} />
                    <Route path="/book" element={<BooksPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/buynow" element={
                        <PrivateRoute>
                            <BuyNowPage />
                        </PrivateRoute>
                        } />
                    <Route path="/logout" element={<LogoutButton />} />
                </Route>
                
            </Routes>
            </AuthProviderUser>
        </>
    );
};
export default AppUser;