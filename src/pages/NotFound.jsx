import { Link } from 'react-router-dom'
import { motion } from "framer-motion";


const NotFound = () => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: .1 } }}
            style={{ backgroundImage: `url('https://static3.depositphotos.com/1002881/151/i/600/depositphotos_1519030-stock-photo-error-404.jpg')` }} className='bg-cover bg-no-repeat h-screen w-full bg-center'>
            <div className='text-center text-yellow-400 pt-20'>
                <motion.h3
                    initial={{ x: -500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: .5 }}
                    className='text-2xl lg:text-4xl font-bold mb-6'>Oops! You are navigating a invalid route.</motion.h3>
                <motion.div
                    initial={{ x: 500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: .3 }}

                >
                    <Link to='/' className='btn btn-sm btn-secondary'>Back to Home</Link>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default NotFound