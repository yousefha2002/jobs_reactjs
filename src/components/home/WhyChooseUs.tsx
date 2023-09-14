import React from 'react'
import TitleHeader from '../ui/TitleHeader'
import ChooseUsBox from './ChooseUsBox'

const data = [
    {
        image:"https://mostaql.hsoubcdn.com/public/assets/images/landing/why-mostaql/like.svg",
        title:"Hire creatives fast",
        content:"Choose the creative person you see fit and hire him directly"
    },
    {
        image:"https://mostaql.hsoubcdn.com/public/assets/images/landing/why-mostaql/teamwork.svg",
        title:"Implement your projects easily",
        content:"Submit your project and leave the task of implementing it to the best experts"
    },
    {
        image:"https://mostaql.hsoubcdn.com/public/assets/images/landing/why-mostaql/laptop.svg",
        title:"Implement your projects at the lowest cost",
        content:"Hire the best expertise to suit your budget"
    },
]

export default function WhyChooseUs() {
    return (
        <div className='my-24 py-20 bg-bgGray'>
            <div className='Container'>
                <TitleHeader title='Why do you choose Hire me'/>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        data.map((item,index)=><ChooseUsBox item={item} key={index}/>)
                    }
                </div>
            </div>
        </div>
    )
}
