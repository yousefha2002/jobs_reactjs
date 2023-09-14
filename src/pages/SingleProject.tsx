import React from 'react'
import Description from '../components/singleProject/Description'
import SubmitteProposals from '../components/singleProject/SubmitteProposals'
import ProjectCard from '../components/singleProject/ProjectCard'
import { useParams } from 'react-router-dom'
import { useJob } from '../hooks/useJob'
import Loading from '../components/ui/Loading'
import CreateProposal from '../components/singleProject/CreateProposal'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


export default function SingleProject() {
    const {id} = useParams()
    const navigate = useNavigate();
    const jobId = id ? parseInt(id) : undefined
    const {data,isLoading,error} = useJob(id)
    if(error)
    {
        navigate('nonexistent-route')
    }

    const {user} = useSelector((state:RootState) => state.user)

    return (
        <div className='bg-bgGray py-10'>
            {
            !isLoading?
            <div className='Container'>
                <h3 className='text-[22px] font-[500] mb-8'>{data?.title}</h3>
                <div className='flex lg:flex-row flex-col gap-x-6'>
                    <div className='xs:w-[100%] lg:w-[55%] xl:w-[65%]'>
                        <Description description={data?.description}/>
                        {user&&user.role==="buyer"&&<CreateProposal jobId={jobId}/>}
                        <SubmitteProposals proposals={data?.proposals} creatorId={data?.createdUser.id}/>
                    </div>
                    <div className='xs:w-[100%] lg:w-[45%] xl:w-[35%]'>
                        <ProjectCard job={data}/>
                    </div>
                </div>
            </div>
            :
            <Loading/>
            }
        </div>
    )
}
