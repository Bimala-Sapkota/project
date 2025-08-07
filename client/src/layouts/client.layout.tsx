import { Outlet } from "react-router";
import NavBar from "../components/header";
import Footer from "../components/footer";

const ClientLayout = () => {
  return (
    <main>
      <div>
        <NavBar />
      </div>

      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default ClientLayout;
