import React from 'react'
import StatisticsCard from '../components/StatisticsCard'
import ProfileSection from '../components/ProfileSection'
import BuyerProject from '../components/BuyerProject'
import { useParams } from 'react-router-dom'
import { useSingleUser } from '../hooks/useUser'
import { useSellerJobs } from '../hooks/useJob'
import Loading from '../components/ui/Loading'

export default function Projects() {
    const {id} = useParams()
    const userId = id ? parseInt(id) : undefined
    const user = useSingleUser(userId)

    const {data,isLoading} = useSellerJobs(id)
    return (
        <>
            <ProfileSection currentUser={user.data}/>
            <div className='bg-bgGray'>
                <div className='Container py-12 flex gap-x-8 items-start'>
                    <div className='shadow bg-[white] w-[55%] py-4'>
                        <h3 className='text-Gray text-[18px] mb-4 px-4'>Projects</h3>
                        {
                            !isLoading
                            ?
                            data?.map(item=><BuyerProject job={item} key={item.id}/>)
                            :
                            <Loading/>
                        }
                    </div>
                    <div className='shadow bg-[white] w-[45%] p-4'>
                        <StatisticsCard userId={userId}/>
                    </div>
                </div>
            </div>
        </>
    )
}
