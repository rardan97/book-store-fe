
// import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";

import AppStaff from "./staff-app/AppStaff";
import AppUser from "./user-app/AppUser";

export default function App() {

  // return (
    const routes = useRoutes([
      { path: "/staff", element: <AppStaff /> },
    { path: "/*", element: <AppUser /> },
    // { path: "/", element: <HomePage /> }
  ]);

  return routes;
    // <>

    //   <Routes>
    //             <Route path="/staff/*" element={<AppStaff />} />
    //             <Route path="/*" element={<AppUser />} />
    //             {/* <Route path="/" element={<HomePage />}/> */}
    //           </Routes>    
         
        
    // </>
  // );
}
