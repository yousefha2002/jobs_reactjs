import React from 'react'

type props = {
    item:{
        title:string,
        content:string,
        image:string
    }
}


export default function ChooseUsBox({item}:props) {
    return (
        <div className='flex flex-col items-center'>
            <img className='w-[90px] h-[90px] mb-4' src={item.image} alt={item.title}/>
            <h3 className='text-center mb-3 text-[18px]'>{item.title}</h3>
            <h4 className='text-center text-Gray text-[15px]'>{item.content}</h4>
        </div>
    )
}
