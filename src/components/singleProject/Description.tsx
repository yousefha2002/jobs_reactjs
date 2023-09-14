import React from 'react'

type props = {
    description:string|undefined
}

export default function Description({description}:props) {
    return (
        <div className='shadow bg-[white] mb-6'>
            <div className='border-b border-[#eaeaea] py-4'>
                <h3 className='px-4'>Project Description</h3>
            </div>
            <div className='p-4'>
                <p>
                    {
                        description
                    }
                </p>
            </div>
        </div>
    )
}
