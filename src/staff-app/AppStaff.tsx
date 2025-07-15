import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import { HelmetProvider } from "react-helmet-async";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Category from "./pages/CategoryPages/Category";
import Books from "./pages/BooksPages/Books";
import UserManagement from "./pages/UserManagementPages/UserManagement";
import Role from "./pages/RolePages/Role";
import { AuthProvider } from "./context/AuthContextStaff";
import PrivateRoute from "./utils/PrivateRoute";
import LogoutButton from "./components/auth/LogoutButton";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppStaff = () => {
return (
    <> 
        <HelmetProvider>
            <AuthProvider>      
            <Routes>
                <Route path="/signin" element={<SignIn />} ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/logout" element={<LogoutButton />} ></Route>
                <Route 
                path="/" element={
                <PrivateRoute>
                    <AppLayout />
                </PrivateRoute>
                
                }>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<UserProfiles />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="blank" element={<Blank />} />
                    <Route path="category" element={<Category />}/>
                    <Route path="books" element={<Books />} />
                    <Route path="usermanagement" element={<UserManagement />} />
                    <Route path="role" element={
                        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                            <Role />
                        </ProtectedRoute>
                    }
                    />

                    {/* Forms */}
                    <Route path="form-elements" element={<FormElements />} />

                    {/* Tables */}
                    <Route path="basic-tables" element={<BasicTables />} />

                    {/* Ui Elements */}
                    <Route path="alerts" element={<Alerts />} />
                    <Route path="avatars" element={<Avatars />} />
                    <Route path="badge" element={<Badges />} />
                    <Route path="buttons" element={<Buttons />} />
                    <Route path="images" element={<Images />} />
                    <Route path="videos" element={<Videos />} />

                    {/* Charts */}
                    <Route path="line-chart" element={<LineChart />} />
                    <Route path="bar-chart" element={<BarChart />} />
                </Route>
            </Routes>
            </AuthProvider>
        </HelmetProvider>
    </>
);
};

export default AppStaff;