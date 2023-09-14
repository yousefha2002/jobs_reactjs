import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { addProjectType } from '../types/addProject'
import { useCategories } from '../hooks/useCategory'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useMutation } from '@tanstack/react-query'

function AddProject() {
    const {data} =  useCategories();
    const {token} = useSelector((state:RootState)=>state.user);
    const { register, handleSubmit,watch ,formState:{errors}} = useForm<addProjectType>()

    const {mutateAsync , isLoading} = useMutation(handleUpdateProfile);
    const onSubmit: SubmitHandler<addProjectType> = (data) => mutateAsync(data);
    
    async function handleUpdateProfile(dataForm:addProjectType)
    {
        try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/job/create`,{
            method:"POST",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({...dataForm,duration:+dataForm.duration,minPrice:+dataForm.minPrice,maxPrice:+dataForm.maxPrice})
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
    <div className='pt-8 pb-20 bg-bgGray'>
        <div className='Container'>
        <h3 className='text-[22px] font-[500] mb-8'>Add Project</h3>
        <form action=""  onSubmit={handleSubmit(onSubmit)} >
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Project Title</label>
                <input {...register("title",{required:true})}
                autoComplete='off'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.title?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Project Description</label>
                <textarea {...register("description",{required:true})}
                autoComplete='off' rows={5}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.description?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Project Category</label>
                <select
                {...register("categoryId",{required:true})}
                id="catgegories" className='bg-gray-50 border max-h-[100px] border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'>
                    {
                        data&&data.map(item=>{
                            return <option className='capitalize' key={item.id} value={item.id}>{item.title}</option>
                        })
                    }
                </select>
                {errors.categoryId?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Project Duration</label>
                <input {...register("duration",{required:true})} min={1} defaultValue={1}
                autoComplete='off' type="number"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.duration?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Project Budget</label>
                <div className='grid grid-cols-2 items-center gap-6'>
                    <div>
                        <label className='text-[16px] block mb-2'>Min</label>
                        <input type="range" className="w-full accent-Primary" 
                        min="50"
                        max="10000"
                        step="50" list="tickmarks"{...register("minPrice")}/>
                        <h3 className="text-end text-Gray relative">{watch("minPrice")}</h3>
                    </div>
                    <div>
                        <label className='text-[16px] block mb-2'>Max</label>
                        <input type="range" className="w-full accent-Primary" 
                        min="50"
                        max="10000"
                        step="50" list="tickmarks"{...register("maxPrice")}/>
                        <h3 className="text-end text-Gray relative">{watch("maxPrice")}</h3>
                    </div>
                    {errors.maxPrice?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
                </div>
            </div>
            {
                isLoading
                ?
                <button className='bg-Primary py-2 px-5 text-[white] rounded opacity-80'>....</button>
                :
                <button type="submit" className='bg-Primary py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Save</button>
            }
        </form>
        </div>
    </div>
    )
}

export default AddProject