import React from 'react'

type props = {
    status: 'open' | 'close' | 'pending';
}

export default function ProjectStatus({status}:props) {
    const statusColor = {
        open:"#2e8b57",
        close:"#9e9e9e",
        pending:"#9e9e9e"
    }
    return (
        <span className={`text-[12px] w-fit text-[white] bg-[${statusColor[status]}] py-1 px-[6px] block`}>
            {status}
        </span>
    )
}
