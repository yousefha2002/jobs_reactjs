import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { motion } from "framer-motion"
import ModalImage from "react-modal-image";
import { useSinglePortofolio } from '../hooks/usePortofolio';
import Loading from '../components/ui/Loading';
import { useMutation } from '@tanstack/react-query';

function SinglePortofolio() {
const navigate = useNavigate()
const {id} = useParams();
const {data , isLoading } = useSinglePortofolio(id);
const {user,token} = useSelector((state:RootState)=>state.user);


const mutation = useMutation({
    mutationFn: () => {
        return fetch(`${process.env.REACT_APP_API_KEY}/portofolio/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":token,
            }
        })
    },
    onSuccess:()=>{
        navigate(`/${user?.id}/portofolio`)
    }
    })

return (
    <div className=' bg-bgGray'>
        <div className=' container py-12 px-4'>
            {
                isLoading
                ?
                <Loading/>
                :
                <div>
                    <div className='flex justify-between items-center mb-8'>
                        <h3 className='text-[24px] font-bold capitalize'>{data?.title}</h3>
                        {
                        data?.userId == user?.id &&
                        <motion.button
                        onClick={()=>mutation.mutate()} 
                        whileHover={{opacity:0.8}}
                        whileTap={{scale:0.9}}
                        className='bg-Primary py-2 px-5 text-[white] rounded'>Delete Work</motion.button>
                        }
                    </div>
                    <div className=' grid grid-cols-12 gap-7 items-start'>
                        <div className=' bg-white p-5 shadow col-span-12 lg:col-span-8'>
                            <h4 className=' capitalize mb-5 pb-3 border-b border-b-gray-300'>work details</h4>
                            <div className=''>
                                {
                                    data?.photos.map(pho=>{
                                        return <div key={pho.id} className=' mb-2'>
                                            <ModalImage 
                                        className=" h-[400px] object-cover w-full"
                                        small={`${process.env.REACT_APP_API_KEY}/uploads/${pho.path}`}
                                        large={`${process.env.REACT_APP_API_KEY}/uploads/${pho.path}`}
                                        />
                                        </div>
                                    })
                                }
                            </div>
                            <p className=' mt-5'>{data?.description}</p>
                        </div>
                        <div className=' bg-white p-5 shadow col-span-12 lg:col-span-4'>
                            <h4 className=' capitalize mb-5 pb-3 border-b border-b-gray-300'>work card</h4>
                            <div className=' flex items-center mb-3'>
                                <h5 className='w-[50%] capitalize'>freelancer name : </h5>
                                <span className='w-[50%] text-blue-700'>
                                    <Link to={`/${data?.userId}/profile`}>
                                    {data?.user?.name}
                                    </Link>
                                </span>
                            </div>
                            <div className=' flex items-center'>
                                <h5 className='w-[50%] capitalize'>date of publication : </h5>
                                <span className='w-[50%]'>
                                    {data?.createdAt?.slice(0,10)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
)
}

export default SinglePortofolio