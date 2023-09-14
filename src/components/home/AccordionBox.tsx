import React,{useState} from 'react'
import { MdOutlineExpandMore,MdOutlineExpandLess } from 'react-icons/md';

type props = {
    item:{
        id:number,
        question:string,
        answer:string
    }
}

export default function AccordionBox({item}:props) {
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded((current) => !current)
    return (
        <div className="my-2 sm:my-4 md:my-6 shadow-sm cursor-pointer bg-white" onClick={toggleExpanded}>
            <div className="px-6 text-left items-center mb-4 select-none flex justify-between flex-row">
                <h5 className="flex-1 text-[18px]">
                {item.question}
                </h5>
                <div className="flex-none pl-2">{expanded ? <MdOutlineExpandLess/> : <MdOutlineExpandMore/>}</div>
            </div>
            <div className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-500 ease-in ${expanded ? "max-h-40" : "max-h-0"}`}>
                <p className="pb-4 text-left">
                {item.answer}
                </p>
            </div>
    </div>
    )
}
