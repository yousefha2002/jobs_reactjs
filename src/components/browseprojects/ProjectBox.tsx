import { BiSolidUser ,BiTimeFive} from 'react-icons/bi';
import {MdOutlineLocalOffer} from 'react-icons/md';
import { Link } from 'react-router-dom';
import ProjectStatus from '../ui/ProjectStatus';
import { Job } from '../../types/models/job.model';
import {format} from 'timeago.js';
import { ProposalBox } from '../../types/models/proposal.model';

type props = {
  isProposal?:boolean,
  item?:Job,
  proposal?:ProposalBox,
}

export default function ProjectBox({isProposal,proposal,item}:props) {
  return (
    <Link to={`/project/${isProposal?proposal?.jobId:item?.id}`}>
      <div className='shadow bg-[white] p-4 border border-[#eaeff2]'>
        <div className='flex items-center gap-x-2'>
          {isProposal&&<ProjectStatus status={"open"}/>}
          <h3 className='text-Primary text-[16px] flex items-center'>{isProposal?proposal?.job.title:item?.title}</h3>
        </div>
        <div className='flex items-center gap-3 my-3'>
          <div className='flex items-center gap-1'>
            <BiSolidUser className='text-Gray'/>
            <h4 className='text-[14px] text-Gray'>{isProposal?proposal?.buyer.name:item?.createdUser.name}</h4>
          </div>
          <div className='flex items-center gap-1'>
            <BiTimeFive className='text-Gray'/>
            <h4 className='text-[14px] text-Gray'>
              {isProposal?proposal?.createdAt&&format(proposal.createdAt):item?.createdAt&&format(item.createdAt)}
            </h4>
          </div>
          {!isProposal&&<div className='flex items-center gap-1'>
            <MdOutlineLocalOffer className='text-Gray'/>
            <h4 className='text-[14px] text-Gray'>{item?.offers} offers</h4>
          </div>}
        </div>
        <h4 className='text-[15px] text-Gray'>{isProposal?proposal?.content:item?.description}</h4>
      </div>
    </Link>
  )
}
