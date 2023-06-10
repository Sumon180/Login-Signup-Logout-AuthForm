import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
        <Route path="*" element={<p className=" text-white text-6xl">Page not found</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
