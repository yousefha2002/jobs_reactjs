import React from 'react'
import Projects from '../components/browseprojects/Projects'
import FilterProjects from '../components/browseprojects/FilterProjects'
import { useJobs } from '../hooks/useJob'
import { useForm } from 'react-hook-form'
import { FilterForm } from '../types/FilterForm'

export default function BrowseProjects() {

  const { register,watch } = useForm<FilterForm>({
    defaultValues:{
        search:"",
        categories:[],
        price:500

    }
})
  const {data,isLoading} = useJobs(watch('search'),watch('price'),watch('categories'))

  return (
    <div className='pt-8 pb-20 bg-bgGray'>
      <div className='Container'>
        <h3 className='text-[22px] font-[500] mb-8'>Presented projects</h3>
        <div className='flex md:flex-row flex-col gap-y-6 gap-x-10'>
          <div className='xs:w-full md:w-[30%] lg:w-[25%] xl:w-[20%]'><FilterProjects register={register} watch={watch}/></div>
          <div className='xs:w-full md:w-[70%] lg:w-[75%] xl:w-[80%]'><Projects isLoading={isLoading} data={data}/></div>
        </div>
      </div>
    </div>
  )
}
