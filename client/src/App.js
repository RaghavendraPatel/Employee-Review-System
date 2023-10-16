import "./styles/global.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { useUserContext } from "./context/userContext";
import { ActiveEmployeeProvider } from "./context/activeEmployeeContext";
import { ReviewFormContextProvider } from "./context/reviewFormContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Employee from "./pages/Employee/Employee";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserProvider>
        <ActiveEmployeeProvider>
          <ReviewFormContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/employee/:id" element={<Employee />} />
              </Routes>
            </Router>
          </ReviewFormContextProvider>
        </ActiveEmployeeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
