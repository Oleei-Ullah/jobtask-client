import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useToken from '../hooks/useToken';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { motion } from "framer-motion";
import useToken from '../hooks/useToken';


const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { setLoading, emailPassSignIn, signInGoogle } = useAuth();
  const [signInEmail, setSignInEmail] = useState('');
  const [firebaseError, setFirebaseError] = useState(null);
  const [token] = useToken(signInEmail);
  useTitle('Login')

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (token) {
    navigate(from, { replace: true })
    toast.success('Sign in successful');
  }


  const handleLogin = data => {
    setFirebaseError(null);
    const { email, password } = data;
    emailPassSignIn(email, password)
      .then(() => {
        setSignInEmail(email);
        setLoading(false);
      }).catch(err => {
        setFirebaseError(err.message)
      })
      .finally(() => {
        setLoading(false);
        reset();
      })
  };

  const googleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user)
        saveUser(result.user.displayName, result.user.email, result.user.photoURL)
        setLoading(false);
      })
  }

  const saveUser = (name, email,photoURL) => {
    const user = { name, email, photoURL };
    fetch(`https://jobtaskphero.vercel.app/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(() => {
        setSignInEmail(email);
      })
  };

  return (
    <motion.div

    initial={{width: 0}}
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: {duration: .5}}}

      className='bg-cover bg-center bg-no-repeat h-[90vh] flex justify-center items-center' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg bg-gray-500 rounded px-6 dark:bg-[#210d4bcf]'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Login</h3>
        <form onSubmit={handleSubmit(handleLogin)} className='space-y-3'>
          <div>
            <label htmlFor="email" className='text-white font-medium  pl-2'>Your Email Address</label>
            <input type="email" className="input input-bordered input-accent w-full bg-white"
              {...register('email', { required: 'Enter Your email address' })}
            />
            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="password" className='text-white font-medium  pl-2'>Your Password</label>
            <input type="password" className="input input-bordered input-accent w-full bg-white"
              {...register('password', { required: true })}
            />
            {errors.password && <span className='text-red-600'>Please Enter Your Password</span>}
            <label className='label  font-medium  pl-2'>Forget Password?</label>
          </div>

          <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Login</button>

            {firebaseError && <span className='text-red-600 font-semibold text-lg'>{firebaseError}</span>}
          </div>
        </form>
        <h1 className='text-center py-1'>New to Task Manager? <Link to={'/register'} className='text-success'>Create an account.</Link></h1>
        <div className="divider text-white">OR</div>

        <div className='text-center'>
          <button onClick={googleSignIn} className="btn btn-outline btn-success  duration-300 block w-full mx-auto uppercase">Continue with google</button>
        </div>

      </div>
    </motion.div>

  )
}

export default Login