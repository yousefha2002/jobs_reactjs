import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { LoginForm } from '../../types/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/userSlice';

function Login () {
  const { register, handleSubmit ,formState:{errors}} = useForm<LoginForm>();
  const [isLoad , setIsLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
      setIsLoad(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/user/login`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({...data})
      })
      const resData = await response.json();
      setIsLoad(false);
      if(response.status!==200 &&response.status!==201)
      {
        toast.error(resData.message,{position:"top-center"});
          throw new Error('failed occured')
      }
      toast.success(resData.msg,{position:"top-center"});
      dispatch(userLogin({user:resData.user , token:resData.token}));
      navigate('/');
  }
  catch(err){
    setIsLoad(false);
    console.log(err);
  }
}


  return (
    <div className='bg-bgGray'>
      <div className='container py-12 px-4'>
        <h3 className='text-center mb-12 text-[28px] font-[500]'>
            Login
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className=' max-w-[600px] mx-auto'>
          <div className='flex flex-col mb-8'>
            <label className='text-[16px] block mb-3'>Email</label>
            <input {...register("email",{required:true})}
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
          {errors.email?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
          </div>
          <div className='flex flex-col mb-8'>
            <label className='text-[16px] block mb-3'>Password</label>
            <input {...register("password",{required:true,minLength:3, maxLength:12})}
            type="password"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {(errors.password?.type==="required" || errors.password?.type==="minLength"||errors.password?.type==="maxLength") && <p className='mt-2 text-[14px] text-red-600'>
              Password should be between 3 and 12 characters
              </p>
            }
          </div>
          {
            isLoad
            ?
            <button className='bg-Primary py-2 px-5 text-[white] rounded opacity-80'>....</button>
            :
            <button type="submit" className='bg-Primary py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Login</button>
          }
          </form>
      </div>
    </div>
  )
}

export default Login