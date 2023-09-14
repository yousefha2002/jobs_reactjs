import React from 'react'
import ProposalBox from './ProposalBox'
import { Proposal } from '../../types/models/proposal.model'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


type props = {
    proposals:Proposal[]|undefined,
    creatorId:number | undefined
}

export default function SubmitteProposals({proposals,creatorId}:props) {
    const {user} = useSelector((state:RootState) => state.user)
    const isCreator = user?.id.toString()===creatorId?.toString()
    return (
        <div className="shadow bg-[white]">
            <div className='border-b border-[#eaeaea] py-4'>
                <h3 className='px-4'>Submitte Proposals</h3>
            </div>
            <div className='pb-4'>
                {
                    proposals?.map(item=><ProposalBox isCreator={isCreator} item={item} key={item.id}/>)
                }
            </div>
        </div>
    )
}
