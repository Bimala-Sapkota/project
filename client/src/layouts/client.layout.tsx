import { Outlet } from "react-router";
import Footer from "../components/footer";
import NavBar from "../components/header";

const ClientLayout = () => {
  return (
    <main>
      {/* nav section */}
      <div className="hidden lg:block">
        <NavBar />
      </div>

      {/* dynamic section */}
      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      {/* footer section */}
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default ClientLayout;
