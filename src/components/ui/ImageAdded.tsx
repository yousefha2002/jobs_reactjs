import React from 'react'
import {AiFillDelete} from 'react-icons/ai'

type props = {
    image:any,
    index:number,
    handleDeleteImage:(ind:number)=>void,
}

export default function ImageAdded({image,index,handleDeleteImage}:props) {
    return (
        <div className='flex items-center gap-x-[6px]'>
            <img className='w-[120px] h-[80px]' src={URL.createObjectURL(image)} alt=''/>
            <button onClick={()=>handleDeleteImage(index)}
            className=' min-w-[6px]'><AiFillDelete className='text-red-600 text-[24px]'/></button>
        </div>
    )
}