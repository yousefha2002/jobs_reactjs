import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className=' bg-bgGray py-[50px] h-[70vh] flex flex-col items-center justify-center'>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png"} 
            alt='erroor' className='w-[120px] h-[120px]'/>
            <Link to={'/'} className='mt-8 bg-red-200 text-Primary px-3 py-2 rounded-md'>Go Home</Link>
        </div>
    )
}

export default NotFoundPage