import React from 'react'
import ProfileSection from '../components/ProfileSection'
import StatisticsCard from '../components/StatisticsCard'
import { useParams } from 'react-router-dom'
import Loading from '../components/ui/Loading'
import { useSingleUser } from '../hooks/useUser'

export default function Profile() {
    const {id} = useParams()
    const userId = id ? parseInt(id) : undefined

    const {isLoading,data} = useSingleUser(userId)

    return (
        <>
        {
            !isLoading?
            <>
                <ProfileSection currentUser={data}/>
                <div className='bg-bgGray'>
                    <div className='Container py-12 flex gap-x-8'>
                        <div className='shadow bg-[white] w-[55%] p-4'>
                            <h3 className='text-Gray text-[18px] mb-4'>About</h3>
                            <p className='text-Gray text-[15px]'>
                                {data?.biography}
                            </p>
                        </div>
                        <div className='shadow bg-[white] w-[45%] p-4'>
                            <StatisticsCard userId={userId}/>
                        </div>
                    </div>
                </div>
            </>
            :
            <Loading/>
    }
        </>
    )
}
