import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

const dispatch=useDispatch
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error}=useSelector((state)=>state.user)

  const navigate = useNavigate();
  
  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData({
      ...formData,
      [id]: value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      // setLoading(true);
      dispatch(signInStart)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message))
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signSuccess(data))
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message))
    }


  }
  console.log(formData,"formdata")
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
      
        <input type="email" placeholder='email' id="email" className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='password' id="password" className='border p-3 rounded-lg' onChange={handleChange}/>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    
  )
}

export default SignIn