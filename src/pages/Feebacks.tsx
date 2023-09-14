import React from 'react'
import ProfileSection from '../components/ProfileSection'
import StatisticsCard from '../components/StatisticsCard'
import ClientRateBox from '../components/ClientRateBox'
import { useParams } from 'react-router-dom'
import { useSingleUser } from '../hooks/useUser'

export default function Feebacks() {
    const {id} = useParams()
    const userId = id ? parseInt(id) : undefined
    const user = useSingleUser(userId)
    return (
        <>
            <ProfileSection currentUser={user.data}/>
            <div className='bg-bgGray'>
                <div className='Container py-12 flex gap-x-8 items-start'>
                    <div className='shadow bg-[white] w-[55%] py-4'>
                        <h3 className='text-Gray text-[18px] mb-4 px-4'>Clients reviews</h3>
                        {
                            [1,2,3].map(item=><ClientRateBox key={item}/>)
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
