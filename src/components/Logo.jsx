import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { logoRotationVariant } from "../data/animationConfig";


export const Logo = () => {
  return (
    <NavLink to="/" className="inline-block">
      <motion.img
        alt="Blog Logo"
        className="w-[60px] py-2"
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30162618/1533-768x591.png"
        variants={logoRotationVariant}
        animate="rotate"
        layout="position"
      />
    </NavLink>
  );
};

export default Logo;
