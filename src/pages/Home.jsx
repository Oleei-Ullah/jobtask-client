import Banner from "../components/Banner";
import useTitle from "../hooks/useTitle"
import { motion } from "framer-motion";

const Home = () => {
  useTitle('Home');


  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: .1 } }}
    >
      <Banner />
    </motion.div>
  )
}

export default Home