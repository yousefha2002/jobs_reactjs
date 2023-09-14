import {BiTimeFive,BiSolidCategory} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Rating from './ui/Rating';

const image = "https://avatars.hsoubcdn.com/ef26f7b8f0ff9dd595a627b1ddb0805f?s=256"

export default function ClientRateBox() {
    return (
        <div className='py-4 border-t border-[#eaeaea]'>
            <Link to="/project/1" className='px-4 block'>
                <h3 className='text-Primary'>title of project</h3>
                <div className='flex items-center gap-3 my-1'>
                    <div className='flex items-center gap-[2px]'>
                        <BiTimeFive className='text-Gray text-[15px]'/>
                        <h4 className='text-[12px] text-Gray'>programming</h4>
                    </div>
                    <div className='flex items-center gap-[2px]'>
                        <BiSolidCategory className='text-Gray text-[15px]'/>
                        <h4 className='text-[12px] text-Gray'>14 hours</h4>
                    </div>
                </div>
            </Link>
            <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-x-2'>
                    <img src={image} alt='yousef' className='w-[45px] h-[45px] rounded-[50%]'/>
                    <div>
                        <h3 className='text-[15px]'>Yousef h.</h3>
                        <p className='text-[13px] text-Gray'>full stack</p>
                    </div>
                </div>
                <Rating rate={5}/>
            </div>
            <p className='px-4 text-[15px] text-Gray'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
        </div>
    )
}
