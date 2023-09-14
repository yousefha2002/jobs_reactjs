import React, { useMemo, useState } from 'react'
import { SubmitHandler, useForm ,Controller} from 'react-hook-form'
import { SignupForm } from '../../types/SignupForm'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import {BiImageAdd} from 'react-icons/bi'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Signup() {
  const { register, handleSubmit,watch ,formState:{errors},control} = useForm<SignupForm>()
  const [image,setImage] = useState<File>();
  const options = useMemo(() => countryList().getData(), []);
  const [isLoad , setIsLoad] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    if(!image){
      toast.error("upload Image is required",{position:"top-center"});
      return;
    }
    setIsLoad(true);
    const formData = new FormData();
    formData.append('image',image);
    formData.append('email',data.email);
    formData.append('name',data.name);
    formData.append('password',data.password);
    formData.append('role',data.role);
    formData.append("country",data.country.value);
    formData.append('biography',data.biography);
    formData.append('job',data.job);
    try{
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/user/signup`,{
          method:"POST",
          body:formData
      })
      const resData = await response.json();
      setIsLoad(false);
      if(response.status!==200 &&response.status!==201)
      {
        toast.error(resData.message,{position:"top-center"});
          throw new Error('failed occured')
      }
      toast.success("signup success",{position:"top-center"});
      navigate('/login');
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
            Create New Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className=' max-w-[600px] mx-auto'>
          <div className='flex flex-col mb-8'>
            <label className='text-[16px] block mb-3'>Name</label>
            <input {...register("name",{required:true})}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.name?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
          </div>
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
          <div className='flex flex-col mb-8'>
            <label className='text-[16px] block mb-3'>You signup as?</label>
            <div className='flex items-center gap-2 mb-2'>
              <input {...register("role",{required:true})}
                type="radio" value={"seller"}
                className="w-4 h-4 text-Primary bg-gray-100 border-gray-300 focus:ring-Primary dark:focus:ring-Primary  focus:ring-2"              
                />
              <label htmlFor="">Seller</label>
            </div>
            <div className='flex items-center gap-2'>
              <input {...register("role",{required:true})}
                type="radio" value={"buyer"}
                className="w-4 h-4 text-Primary bg-gray-100 border-gray-300 focus:ring-Primary dark:focus:ring-Primary  focus:ring-2"
                />
              <label htmlFor="">Buyer</label>
              </div>
              {errors.role?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
          </div>
          <div className='flex flex-col mb-8'>
            <label className='text-[16px] block mb-3'>Job Title</label>
            <input {...register("job",{required:true})}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
          {errors.job?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
          </div>
          <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Biography</label>
                <textarea {...register("biography",{required:true})}
                autoComplete='off' rows={5}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.biography?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
          <div className='flex flex-col mb-8'>
          <label className='text-[16px] block mb-3'>Country</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} options={options} className=' focus:ring-Primary border-Primary focus:ring-0'/>}
          />
          {errors.country?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
          </div>
          <div className='mb-8'>
          <div className="mb-[10px]">
            <label htmlFor='images'>
                <div className='flex items-center w-full gap-x-2 justify-center h-[80px] border-[1px] border-gray-500 border-dashed'>
                    <h5 className='text-[15px] font-[600]'>Pick Image</h5>
                    <div><BiImageAdd className='text-[22px]'/></div>
                </div>
            </label>
            <input onChange={(e)=>(e.target.files && setImage(e.target.files[0] ))} hidden type='file' id="images" accept="image/png, image/jpeg" />
            <hr/>
            </div>
            {image && <div className='h-[200px] overflow-y-auto'><img src={URL.createObjectURL(image)} alt='' className='w-full'/></div>}
          </div>
          {
            isLoad?
            <button className='bg-Primary py-2 px-5 text-[white] rounded opacity-80'>....</button>
            :
            <button type="submit" className='bg-Primary py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Signup</button>
          }
          </form>
      </div>
    </div>
  )
}

export default Signup