import React from 'react'
import FilterFreelancers from '../components/freelancers/filterFreelancers'
import FreelancersMap from '../components/freelancers/FreelancersMap'
import { useFreelancers } from '../hooks/useUser'
import { useForm } from 'react-hook-form'
import { FilterForm } from '../types/FilterForm'

export default function Freelancers() {
    const { register,watch } = useForm<FilterForm>({
        defaultValues:{
            search:""
        }
    })
    const {data,isLoading} = useFreelancers(watch('search'))

    return (
        <div className='pt-8 pb-20 bg-bgGray min-h-[90vh]'>
            <div className='Container'>
                <h3 className='text-[22px] font-[500] mb-8'>Freelancers</h3>
                <div className='flex md:flex-row flex-col gap-y-6 gap-x-10'>
                <div className='xs:w-full md:w-[30%] lg:w-[25%] xl:w-[20%]'>
                    <FilterFreelancers register={register}/>
                </div>
                <div className='xs:w-full md:w-[70%] lg:w-[75%] xl:w-[80%]'>
                    <FreelancersMap isLoading={isLoading} data={data}/>
                </div>
                </div>
            </div>
        </div>
    )
}
