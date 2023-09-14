import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai';

export default function SuccessStage() {
    return (
        <span className='flex items-center justify-center w-[25px] font-[600] text-[18px]
        text-[white] h-[25px] rounded-[50%] bg-[#009688]'>
            <AiOutlineCheck/>
        </span>
    )
}
