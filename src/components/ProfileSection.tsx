import { BsFillBagFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import {IoMdAdd} from 'react-icons/io'
import {LiaSlidersHSolid} from 'react-icons/lia'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {countries} from 'country-data';
import UserSkeleton from './skeletons/UserSkeleton';
import { User } from '../types/models/user.model';

type props = {
    currentUser:User|undefined
}

export default function ProfileSection({currentUser}:props) {
    const {user} = useSelector((state:RootState) => state.user)
    const buyerTabs = [
        {
            title:"Profile",
            link:`${currentUser?.id}/profile`
        },
        {
            title:"Portofolio",
            link:`${currentUser?.id}/portofolio`
        },
        {
            title:"Feebacks",
            link:`${currentUser?.id}/feebacks`
        },
    ]

    const sellerTabs = [
        {
            title:"Profile",
            link:`${currentUser?.id}/profile`
        },
        {
            title:"Projects",
            link:`${currentUser?.id}/projects`
        }
    ]

    return (
        <div className='pt-8'>
            <div className='Container'>
                {
                currentUser
                ?
                <div className='flex flex-col items-center mb-12'>
                    <img src={`${process.env.REACT_APP_API_KEY}/uploads/${currentUser?.image}`} alt='Yousef' className='w-[150px] h-[150px] rounded-[50%] mb-3'/>
                    <h3 className='text-[24px] mb-3'>{currentUser?.name}</h3>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <BsFillBagFill className='text-Gray text-[14px]'/>
                            <h4 className='text-[13px] text-Gray'>{currentUser?.job_title}</h4>
                        </div>
                        <div className='flex items-center gap-1'>
                            <FaMapMarkerAlt className='text-Gray text-[14px]'/>
                            <h4 className='text-[13px] text-Gray'>{currentUser?.country&&countries[currentUser?.country].name}</h4>
                        </div>
                    </div>
                </div>
                :
                <div className='flex justify-center mb-12'>
                    <UserSkeleton/>
                </div>
                }
                <div className='flex md:items-center justify-between md:flex-row flex-col gap-y-7'>
                    <div className='order-2 md:order-1 flex items-center'>
                    {
                        currentUser?.role==="buyer"&&buyerTabs.map(item=>
                            {
                                return <NavLink key={item.title} to={`/${item.link}`} 
                                className={({isActive})=>`${isActive?"bg-bgGray":"hover:bg-bgGray duration-300"} p-4 text-Gray`} 
                                ><div className='p-1'>{item.title}</div></NavLink>
                            })
                    }
                    {
                        currentUser?.role==="seller"&&sellerTabs.map(item=>
                            {
                                return <NavLink key={item.title} to={`/${item.link}`} 
                                className={({isActive})=>`${isActive?"bg-bgGray":"hover:bg-bgGray duration-300"} p-4 text-Gray`} 
                                ><div className='p-1'>{item.title}</div></NavLink>
                            })
                    }
                    </div>
                    {currentUser?.id.toString()===user?.id.toString()&&
                    <div className=' flex items-center gap-2 order-1 md:order-2'>
                        {
                            user?.role==="buyer"
                            ?
                            <Link to={"/portofolio/create"}
                            className='py-2 px-4 bg-Primary text-white flex items-center mb-2 hover:bg-opacity-80 duration-300'
                            >
                                <IoMdAdd/>
                                <span>Add Work</span>
                            </Link>
                            :
                            <Link to={"/project/create"}
                            className='py-2 px-4 bg-Primary text-white flex items-center mb-2 hover:bg-opacity-80 duration-300'
                            >
                                <IoMdAdd/>
                                <span>Add Project</span>
                        </Link>
                        }
                        <Link to={"/profile/update"}
                        className='py-2 px-4 bg-Primary text-white flex items-center mb-2 hover:bg-opacity-80 duration-300'
                        >
                            <LiaSlidersHSolid/>
                            <span>Update Profile</span>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}