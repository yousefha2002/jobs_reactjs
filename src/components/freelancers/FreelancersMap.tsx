import React from 'react'
import FreelancerBox from './FreelancerBox'
import { User } from '../../types/models/user.model'
import Loading from '../ui/Loading'

type props = {
    data:User[]|undefined,
    isLoading:boolean
}

export default function FreelancersMap({data,isLoading}:props) {
    return (
        <div>
            {
                !isLoading
                ?
                data?.map(item=><FreelancerBox item={item} key={item.id}/>)
                :
                <Loading/>
            }
        </div>
    )
}
