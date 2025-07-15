
import { Outlet } from "react-router";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const LayoutContent: React.FC = () => {

    return (
        <div>
            <AppHeader />
            <Outlet />
            <br />  
            <AppFooter />
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
            <LayoutContent />
    );
};

export default AppLayout;
