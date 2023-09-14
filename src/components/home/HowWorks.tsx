import React from 'react'
import TitleHeader from '../ui/TitleHeader'
import { AiOutlineProject } from 'react-icons/ai';
import { MdAdsClick } from 'react-icons/md';
import { LiaReceiptSolid } from 'react-icons/lia';
import HowWorksBox from './HowWorksBox';

const data = [
    {
        title:"Add project",
        content:"Add the details of your project to complete it.",
        icon:AiOutlineProject
    },
    {
        title:"Choose the appropriate offer",
        content:"Choose the suitable offer for the requirements of the project.",
        icon:MdAdsClick
    },
    {
        title:"Receive the project",
        content:"The freelancer you choose will work with you until the job is finished.",
        icon:LiaReceiptSolid
    }
]

export default function HowWorks() {
    return (
        <div className='my-20 Container'>
            <TitleHeader title='How Hire me website works'/>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    data.map((item,index)=><HowWorksBox key={index} item={item}/>)
                }
            </div>
        </div>
    )
}
