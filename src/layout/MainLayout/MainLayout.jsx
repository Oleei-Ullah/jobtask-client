import { Outlet } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { AnimatePresence } from "framer-motion";

const MainLayout = () => {
  // const location = useLocation();
  return (
    <div className="dark:bg-[#192655]">
        <Navbar />
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
        <Footer />
    </div>
  )
}

export default MainLayout