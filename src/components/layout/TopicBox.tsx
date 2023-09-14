import React from 'react'
import {Link} from 'react-router-dom'

type props = {
    item:{
        title:string,
        link:string,
        icon:any
    }
}

export default function TopicBox({item}:props) {
    return (
        <div className='mb-6'>
            <Link to={`/${item.link}`}>
                <div className='flex items-center gap-x-4'>
                    <div className='text-[16px]'><item.icon/></div>
                    <h3 className='font-[400] text-[15px]'>{item.title}</h3>
                </div>
            </Link>
        </div>
    )
}
