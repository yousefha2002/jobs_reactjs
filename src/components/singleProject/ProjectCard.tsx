import React from 'react'
import ProjectStatus from '../ui/ProjectStatus'
import SuccessStage from '../ui/SuccessStage';
import CurrentStage from '../ui/CurrentStage';
import WaitingStage from '../ui/WaitingStage';
import { Job } from '../../types/models/job.model';
import {format} from 'timeago.js';
import {countries} from 'country-data';

type props = {
    job:Job|undefined
}

export default function ProjectCard({job}:props) {
    return (
        <div className='shadow bg-[white] mb-6'>
        <div className='border-b border-[#eaeaea] py-4'>
            <h3 className='px-4'>Project Card</h3>
        </div>
        <div className='p-4 flex items-center justify-between border-b border-[#eaeaea]'>
            <div className='flex flex-col gap-y-4'>
                <h4>Status</h4>
                <h4>Date of publication</h4>
                <h4>Budget</h4>
                <h4>Duration</h4>
                <h4>Average proposals</h4>
                <h4>Number of proposals</h4>
            </div>
            <div className='flex flex-col gap-y-4'>
                <ProjectStatus status={job?.status as 'open' | 'close' | 'pending'}/>
                <h4>{job?.createdAt&&format(job?.createdAt)}</h4>
                <h4>{job?.price.min}$ - {job?.price.max}$</h4>
                <h4>{job?.duration} days</h4>
                <h4>{job?.proposalAverage&&parseFloat(job?.proposalAverage).toFixed(2)}$</h4>
                <h4>{job?.proposalCount}</h4>
            </div>
        </div>
        <div className='p-4 border-[#eaeaea] border-b'>
            <div className='flex items-center gap-x-2 mb-4'>
                {job?.level!=="offers"?<SuccessStage/>:<CurrentStage/>}
                <span>Bids receiving</span>
            </div>
            <div className='flex items-center gap-x-2 mb-4'>
                {job?.level==="offers"?<WaitingStage/>:job?.level==="implementation"?<CurrentStage/>:<SuccessStage/>}
                <span>Implementation</span>
            </div>
            <div className='flex items-center gap-x-2 mb-4'>
                {job?.level!=="delivered"?<WaitingStage/>:<SuccessStage/>}
                <span>Delivery</span>
            </div>
        </div>
        <div className='p-4'>
            <h4 className='mb-4'>Owner of the project</h4>
            <div className='flex items-center gap-x-2'>
                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${job?.createdUser.image}`} alt={job?.createdUser.name} className='w-[50px] h-[50px] rounded-[50%]'/>
                <div>
                    <h4>{job?.createdUser.name}</h4>
                    <p className='text-[12px] text-Gray'>
                        {job&&countries[job?.createdUser.country].name}
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}
