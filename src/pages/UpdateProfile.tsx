import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm} from 'react-hook-form'
import {BiImageAdd} from 'react-icons/bi'
import { UpdateProfileForm } from '../types/updateProfile';
import { useSingleUser } from '../hooks/useUser';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function UpdateProfile() {
    const { register, handleSubmit,setValue ,formState:{errors}} = useForm<UpdateProfileForm>()

    const [image,setImage] = useState<File>()
    const {user,token} = useSelector((state:RootState) => state.user)
    const {data} = useSingleUser(user?.id)

    useEffect(() => {
      if (data) {
        setValue('name', data.name);
        setValue('job_title', data.job_title);
        setValue('biography', data.biography);
      }
    }, [data, setValue]);

     /** handle update profile functions */
    const {mutateAsync , isLoading} = useMutation(handleUpdateProfile);
    const onSubmit: SubmitHandler<UpdateProfileForm> = (data) => mutateAsync(data)

    async function handleUpdateProfile(dataForm:UpdateProfileForm)
    {
      const formData = new FormData();
      if(image)
      {
        formData.append('image',image);
      }
      formData.append('biography',dataForm.biography);
      formData.append('name',dataForm.name);
      formData.append('job_title',dataForm.job_title);
      try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/user/update`,{
            method:"PUT",
            headers:{
                "Authorization":token
            },
            body:formData
        })
        const data = await response.json()
        if(response.status!==200&&response.status!==201)
        {
            toast.error(data.message,{position:"top-center"});
            throw new Error('failed occured')
        }
        toast.success(data.message,{position:"top-center"});
      }
      catch(err){
          console.log(err)
      }
    }

    return (
      <div className='bg-bgGray'>
        <div className='container py-12 px-4'>
          <h3 className='text-center mb-12 text-[28px] font-[500]'>
              Update Profile
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className=' max-w-[600px] mx-auto'>
            <div className='flex flex-col mb-8'>
              <label className='text-[16px] block mb-3'>Name</label>
              <input {...register("name",{required:true})}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
              {errors.name?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
              <label className='text-[16px] block mb-3'>Job Title</label>
              <input {...register("job_title",{required:true})}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
              {errors.job_title?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Biography</label>
                <textarea {...register("biography",{required:true})}
                autoComplete='off' rows={5}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.biography?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
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
              {image ? 
              <div className='h-[200px] overflow-y-auto'><img src={URL.createObjectURL(image)} alt='' className='w-full'/></div>
              :
              <div className='h-[200px] overflow-y-auto'><img src={`${process.env.REACT_APP_API_KEY}/uploads/${data?.image}`} alt='' className='w-full'/></div>
              }
            </div>
            {
            !isLoading
            ?
            <button type="submit" className='bg-Primary py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Save</button>
            :
            <button className='bg-Primary opacity-50 py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Save...</button>
            }
            </form>
        </div>
      </div>
    )
}

export default UpdateProfile