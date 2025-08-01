import "./APP.css";
import HomePage from "./pages/home";

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function APP() {
  return (
    <>
      <Router>
        <Routes>
          {/* defining page routes*/}
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>404 page not found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default APP;
