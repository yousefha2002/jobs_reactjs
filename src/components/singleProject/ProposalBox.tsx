import Rating from '../ui/Rating'
import { BsPersonWorkspace } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { Proposal } from '../../types/models/proposal.model';
import {format} from 'timeago.js';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-hot-toast'

type props = {
    item:Proposal,
    isCreator:boolean
}

export default function ProposalBox({item,isCreator}:props) {
    const {token} = useSelector((state:RootState) => state.user)
    const mutaion = useMutation({
        mutationFn: async(type:string) => {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/proposal/${item.Proposal.jobId}/${item.id}/${type}`,{
                method:"POST",
                headers:{
                    "Authorization":token,
                }
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message);
            }
    
            return response.json();
        },
        onSuccess:(data)=>{
            toast.success(data.message,{position:"top-center"});
        },
        onError:(error)=>{
            if (error instanceof Error) {
                toast.error(error.message, { position: "top-center" });
            } else {
                toast.error("An error occurred while processing your request.", { position: "top-center" });
            }
        }
    })

    return (
        <div className='border-b border-[#eaeaea] py-4'>
            <div className='px-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-3 mb-3'>
                        <img src={`${process.env.REACT_APP_API_KEY}/uploads/${item.image}`}
                        alt={item.name} className='w-[45px] h-[45px] rounded-[50%]'/>
                        <div>
                            <Link to={`/${item.id}/profile`}>
                                <div className='flex items-center gap-x-1 mb-1'>
                                    <h3 className='text-[15px] text-Primary'>{item.name}</h3>
                                    <Rating rate={5}/>
                                </div>
                            </Link>
                            <div className='flex items-center gap-x-2'>
                                <div className='flex items-center gap-1'>
                                    <BsPersonWorkspace className='text-Gray text-[16px]'/>
                                    <h4 className='text-[13px] text-Gray'>{item.job_title}</h4>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <BiTime className='text-Gray text-[16px]'/>
                                    <h4 className='text-[13px] text-Gray'>{format(item.Proposal.createdAt)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isCreator&&
                        <div className='flex flex-col gap-y-2'>
                            <button onClick={()=>mutaion.mutate("select")}  
                            className='bg-[#2e8b57] text-[14px] py-1 px-2 text-[white] rounded hover:opacity-80 duration-300'>Choose</button>
                            <button onClick={()=>mutaion.mutate("denied")}  
                            className='bg-Primary text-[14px] py-1 px-2 text-[white] rounded hover:opacity-80 duration-300'>Denie</button>
                        </div>
                    }
                </div>
                <p className='text-Gray'>{item.Proposal.content}</p>
            </div>
        </div>
    )
}