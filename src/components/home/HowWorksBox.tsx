import React from 'react'

type props = {
    item:{
        title:string,
        content:string,
        icon:any
    }
}

export default function HowWorksBox({item}:props) {
    return (
        <div className='flex items-center gap-x-4 shadow bg-[#fff] px-4 py-6'>
            <div className='text-[38px]'><item.icon/></div>
            <div>
                <h3 className='text-[20px] mb-2'>{item.title}</h3>
                <h4 className='text-[15px] text-Gray'>{item.content}</h4>
            </div>
        </div>
    )
}
