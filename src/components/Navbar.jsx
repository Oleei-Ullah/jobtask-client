import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  FaSignInAlt } from 'react-icons/fa'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { useAuth } from '../hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { mobileNavContainerVariant, mobileNavExitProps, mobileNavListVariant } from '../data/animationConfig';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const [mode, setMode] = useState('light')
  const navigate = useNavigate();

  const [light, setLight] = useState(true)

  const activeClassName = "selected navlink";
  const activeStyleCallback = ({ isActive }) =>
    isActive ? activeClassName : "navlink";

  const handleTheme = () => {
    setLight(!light);
    setTheme(light ? 'dark' : 'light')
    setMode(mode == 'light' ? 'dark' : 'light')
  };

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme)
    if (mode == 'light') {
      document.querySelector('html').classList.add('light')
      document.querySelector('html').classList.remove('dark')
    }

    if (mode == 'dark') {
      document.querySelector('html').classList.add('dark')
      document.querySelector('html').classList.remove('light')
    }

  }, [theme, mode])
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const signOut = () => {
    logOut().then(() => {
      toast.success(`successfully logged out`)
    })
  };

  return (
    <div>
      <div className="navbar bg-[#eef5f2] dark:bg-[#210d4bcf] shadow font-lora">
        <div className="flex-1">
          <Logo />
          <span className='text-[20px] ms-3 font-bold text-[#190482] dark:text-[#008170]'>Tasker</span>
        </div>
        <div className="flex-none text-black dark:text-white hidden md:block md:mr-[10%]">
          <ul className="gap-4 uppercase text-sm font-semibold menu-horizontal p-0">
            <li><NavLink className={({ isActive }) => isActive ? 'text-red-500' : ''} to={'/'}>Home</NavLink></li>


            <li><NavLink className={({ isActive }) => isActive ? 'text-red-500' : ''} to={'/allproducts'}>Products</NavLink></li>


          </ul>
        </div>


        <div className='mr-4'>
          {
            light ? <BsSun onClick={() => handleTheme()} /> : <BsFillMoonFill onClick={() => handleTheme()} />
          }
        </div>
        <div className="flex-none gap-2">
          <div>
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img title={user?.displayName} src={user?.photoURL} alt='' />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 gap-4 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10">
                  <li><h1  className='text-center cursor-none'>{user?.displayName}</h1></li>
                  <li><button onClick={() => navigate('/dashboard')} className='btn btn-sm'>Dashboard</button></li>
                  <li><button onClick={signOut} className='btn btn-sm'>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className='flex items-center gap-1 hover:bg-gray-300 p-2 rounded hover:text-[#3431bb] font-semibold duration-300'>
                <Link className='text-red-700 dark:text-blue-700' to={'login'}>Login</Link>
                <FaSignInAlt />
              </div>
            )}
          </div>

          <button className='md:hidden text-[#966b16]' onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            layout="position"
            key="nav-links"
            variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            className=" basis-full md:hidden bg-[#140101e3] text-white"
          >
            <motion.div variants={mobileNavListVariant} {...mobileNavExitProps} onClick={() => setOpen(!open)}>
              <NavLink to="/" className={activeStyleCallback}>
                Home
              </NavLink>
            </motion.div>


            <motion.div variants={mobileNavListVariant} {...mobileNavExitProps} onClick={() => setOpen(!open)}>
              <NavLink to="/contact" className={activeStyleCallback}>
                Products
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  )
}

export default Navbar;

