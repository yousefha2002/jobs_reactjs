import React from 'react'

type props = {
    title:string
}

export default function TitleHeader({title}:props) {
    return (
        <h3 className='text-center mb-12 text-Primary text-[28px] font-[500]'>
            {title}
        </h3>
    )
}
