import { AiOutlineMenu } from 'react-icons/ai';
import {Link} from 'react-router-dom'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {MdOutlineLogout} from 'react-icons/md'
import { userLogout } from '../../redux/userSlice';

type props = {
  onClick:()=>void
}

export default function Navbar({onClick}:props) {
  const {user} = useSelector((s:RootState) => s.user);
  const dispatch = useDispatch();

  const logoutBtnClick=()=>{
    dispatch(userLogout());
  }

  return (
    <div>
      <nav className="bg-Primary border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto py-4 Container">
          <div className='flex items-center gap-x-3'>
            <button onClick={onClick}><AiOutlineMenu className='text-[20px] font-[700] text-[white]'/></button>
            <Link to="" className="flex items-center">
                <span className="self-center text-[20px] font-semibold whitespace-nowrap text-[white]">Hire me</span>
            </Link>
          </div>
          {
            !user
            ?
            <div className="w-auto" id="navbar-default">
            <ul className="font-medium flex p-0 rounded-lg flex-row space-x-8 mt-0">
              <li>
                <Link to="/login" className="block text-[white]" aria-current="page">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="block text-[white]" aria-current="page">New account</Link>
              </li>
            </ul>
          </div>
          :
          <button className='text-white flex items-center gap-1 duration-300 hover:scale-110' onClick={logoutBtnClick}>
            <span>Logout</span>
            <MdOutlineLogout/>
          </button>
          }
        </div>
      </nav>
    </div>
  )
}
