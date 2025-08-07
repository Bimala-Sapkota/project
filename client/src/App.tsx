import "./App.css";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Products from "./pages/product";
import AbouUs from "./pages/about";
import ContactUs from "./pages/contact-us";
import NotFound from "./pages/page-not-found";
import ClientLayout from "./layouts/client.layout";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          {/* defining page routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about_us" element={<AbouUs />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
