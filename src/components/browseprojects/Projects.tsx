import React from 'react'
import ProjectBox from './ProjectBox'
import { Job } from '../../types/models/job.model'
import Loading from '../ui/Loading'

type props = {
    data:Job[]|undefined,
    isLoading:boolean
}

export default function Projects({data,isLoading}:props) {
    return (
        <div>
            {
                !isLoading?
                data?.map(item=><ProjectBox item={item} key={item.id}/>)
                :
                <Loading/>
            }
        </div>
    )
}
