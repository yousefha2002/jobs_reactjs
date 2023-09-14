import React from 'react'
import ProfileSection from '../components/ProfileSection'
import PortofilioProjectBox from '../components/PortofilioProjectBox'
import { useUserPortofolios } from '../hooks/usePortofolio'
import {useParams} from 'react-router-dom'
import PortofolioSkeleton from '../components/skeletons/PortofolioSkeleton'
import { useSingleUser } from '../hooks/useUser'

export default function Portofolio() {
    const {id} = useParams()
    const {data,isLoading} = useUserPortofolios(id)

    const userId = id ? parseInt(id) : undefined
    const user = useSingleUser(userId)

    return (
        <>
            <ProfileSection currentUser={user.data}/>
            <div className='bg-bgGray'>
                <div className='Container py-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {
                        !isLoading
                        ?
                        data?.map(item=><PortofilioProjectBox item={item} key={item.id}/>)
                        :
                        [1,2,3,4].map(item=><PortofolioSkeleton key={item}/>)
                    }
                </div>
            </div>
        </>
    )
}
