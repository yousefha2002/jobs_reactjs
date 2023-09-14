import React from 'react'
import Rating from './ui/Rating'
import { useUserCard } from '../hooks/useUser'
import moment from 'moment'

type props = {
    userId:number|undefined
}

export default function StatisticsCard({userId}:props) {
    const {data,isLoading} = useUserCard(userId)
    return (
        <div>
            <h3 className='text-Gray text-[18px] mb-4'>Statistics</h3>
            <div className='flex items-center gap-x-12 text-Gray text-[15px] mb-3'>
                <h3>Rating</h3>
                <h3><Rating rate={4}/></h3>
            </div>
            <div className='flex items-center gap-x-12 text-Gray text-[15px]'>
                <h3>Date of registration</h3>
                <h3>{isLoading?"":moment(data?.createdAt).format('LL')}</h3>
            </div>
        </div>
    )
}
