import React from 'react'


export default function Banner() {
    return (
        <div className='banner bg-no-repeat bg-cover h-[40vh] overlay relative flex justify-center flex-col items-center'>
            <div className="relative z-10 Container">
                <h3 className='text-[32px] text-center text-[white] mb-5 font-[500]'>Complete your projects online easily and securely</h3>
                <p className='text-[20px] text-center text-[white]'>Hire professional freelancers to get your business done</p>
            </div>
        </div>
    )
}