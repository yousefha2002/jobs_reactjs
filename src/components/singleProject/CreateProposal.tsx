import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { RootState } from '../../redux/store'
import { addProposalType } from '../../types/addProposalType'

type Props ={ 
    jobId:number|undefined
}

function CreateProposal({jobId}:Props) {
    const {token} = useSelector((state:RootState)=>state.user);
    const { register, handleSubmit ,formState:{errors}} = useForm<addProposalType>()

    const {mutateAsync , isLoading} = useMutation(handleUpdateProfile);
    const onSubmit: SubmitHandler<addProposalType> = (data) => mutateAsync(data);
    
    async function handleUpdateProfile(dataForm:addProposalType)
    {
        try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/proposal/create`,{
            method:"POST",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({content:dataForm.description,jobId ,duration:+dataForm.duration , price:+dataForm.price})
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
        <div className='shadow bg-[white] py-4 mb-6'>
        <div>
        <div className='border-b border-[#eaeaea] pb-4'>
                <h3 className='px-4'>Sumbit Your Proposal</h3>
        </div>
        <form action=""  onSubmit={handleSubmit(onSubmit)} className='px-4 py-4'>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Proposal Description</label>
                <textarea {...register("description",{required:true})}
                autoComplete='off' rows={5}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            {errors.description?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
            </div>
            <div className='flex flex-col mb-4'>
                    <div className='grid grid-cols-2 items-center gap-6'>
                        <div>
                            <label className='text-[16px] block mb-3'>Duration</label>
                            <input {...register("duration",{required:true})} min={1} defaultValue={1}
                            autoComplete='off' type="number"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
                            {errors.duration?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
                        </div>
                        <div>
                            <label className='text-[16px] block mb-3'>Budget</label>
                            <input {...register("price",{required:true})} min={1} defaultValue={50}
                            autoComplete='off' type="number"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
                            {errors.price?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
                        </div>
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

export default CreateProposal