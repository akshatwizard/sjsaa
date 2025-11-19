import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StickyBtn from "./components/StickyBtn";

export default function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith("/admin") || location.pathname.startsWith("/member-preview");;

  return (
    <>
      {!hideNavAndFooter && <Header />}
      <Outlet />
      <StickyBtn/>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
