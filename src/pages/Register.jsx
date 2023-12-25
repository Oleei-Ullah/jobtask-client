
import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import useToken from '../hooks/useToken';

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {emailPassUserCreate, signInGoogle, updateUser, setLoading} = useAuth();
  const [createdEmail, setCreatedEmail] = useState('');
  const [firebaseError, setFirebaseError] = useState(null);
  const [token] = useToken(createdEmail);
  const navigate = useNavigate();
  useTitle('Register')


  if(token) {
    navigate('/');
    toast.success('User created and updated successfully');
  }



  const handleRegister = (data) => {
    setFirebaseError(null)
    const {name,email, password,photo} = data;
    emailPassUserCreate(email,password)
    .then(() => {
        updateUser({displayName: name})
        .then(() => {
          saveUser(name, email,photo)
        })
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
        saveUser(result.user.displayName, result.user.email)
        setLoading(false);
      })
  }

  //saveuser fucntion

  const saveUser = (name,email,photoURL) => {
    const user = {name,email,photoURL};
    fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(() => {
      setCreatedEmail(email);
    })
  };




  return (
    <div className='bg-cover bg-center bg-no-repeat h-[100vh] flex justify-center items-center' style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrYQIlwjbGOuvQLGnUWTrdmfo-a2Cctpbx5QG806AIg&s)` }}>
      <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6 dark:bg-[#210d4bcf] bg-gray-500'>
        <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Register</h3>
        <form onSubmit={handleSubmit(handleRegister)} className='space-y-3'>

        <div>
            <label htmlFor="name" className='text-white font-medium  pl-2'>Your Name</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-red-600'>Please Enter Name</span>}
          </div>

          <div>
            <label htmlFor="email" className='text-white font-medium  pl-2'>Your Email Address</label>
            <input type="email" className="input input-bordered input-accent w-full bg-white"
              {...register('email', { required: true })}
            />
            {errors.mail && <span className='text-red-600'>Please Enter Your email Address</span>}
          </div>

          <div>
            <label htmlFor="password" className='text-white font-medium  pl-2'>Your Password</label>
            <input type="password" className="input input-bordered input-accent w-full bg-white"
              {...register('password', { required: true })}
            />
            {errors.password && <span className='text-red-600'>Please Enter Your Password</span>}
          </div>

          <div>
            <label htmlFor="photo" className='text-white font-medium  pl-2'>Your photoURL</label>
            <input type="text" className="input input-bordered input-accent w-full bg-white"
              {...register('photo', { required: true })}
            />
            {errors.photo && <span className='text-red-600'>Please Enter photoURL</span>}
          </div>

          <div className='text-center'>
            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">Register</button>

            {firebaseError && <span className='text-red-600 font-semibold text-lg'>{firebaseError}</span>}
          </div>
        </form>
        <h1 className='text-center py-1'>Have an account? <Link to={'/login'} className='text-success'>Sign in</Link></h1>
        <div className="divider text-white">OR</div>

        <div className='text-center'>
          <button onClick={googleSignIn} className="btn btn-outline btn-success  duration-300 block w-full mx-auto uppercase">Continue with google</button>
        </div>

      </div>
    </div>

  )
}

export default Register;