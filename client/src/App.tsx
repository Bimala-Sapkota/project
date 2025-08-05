import "./App.css";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Products from "./pages/product";
import AbouUs from "./pages/about";
import ContactUs from "./pages/contact-us";
import NotFound from "./pages/page-not-found";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* defining page routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about_us" element={<AbouUs />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
