import React from 'react'
import ProjectStatus from './ui/ProjectStatus'
import {BiTimeFive,BiSolidCategory} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Job } from '../types/models/job.model';
import {format} from 'timeago.js';

type props = {
    job:Job
}

export default function BuyerProject({job}:props) {
    return (
        <div className='py-4 border-t border-[#eaeaea]'>
            <Link to={`/project/${job.id}`}>
                <div className='flex items-center gap-x-1 px-4'>
                    <ProjectStatus status={job.status as 'open' | 'close' | 'pending'}/>
                    <h3 className='text-Primary'>{job.title}</h3>
                </div>
            </Link>
            <div className='flex items-center gap-3 my-2 px-4'>
                <div className='flex items-center gap-[2px]'>
                    <BiTimeFive className='text-Gray text-[15px]'/>
                    <h4 className='text-[12px] text-Gray'>{job.category.title}</h4>
                </div>
                <div className='flex items-center gap-[2px]'>
                    <BiSolidCategory className='text-Gray text-[15px]'/>
                    <h4 className='text-[12px] text-Gray'>{format(job.createdAt)}</h4>
                </div>
            </div>
        </div>
    )
}
