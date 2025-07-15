
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppStaff from "./staff-app/AppStaff";
import AppUser from "./user-app/AppUser";

export default function App() {

  return (
    <>
    <Router>
<Routes>
          <Route path="/staff/*" element={<AppStaff />} />
          <Route path="/*" element={<AppUser />} />
          {/* <Route path="/" element={<HomePage />}/> */}
        </Routes>    
    </Router>
        
    </>
  );
}
