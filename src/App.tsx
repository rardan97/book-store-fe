
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppStaff from "./staff-app/AppStaff";

export default function App() {

  return (
    <>
    <Router>
<Routes>
          <Route path="/staff/*" element={<AppStaff />} />
          {/* <Route path="/user/*" element={<AppUser />} /> */}
          {/* <Route path="/" element={<HomePage />}/> */}
        </Routes>    
    </Router>
        
    </>
  );
}
