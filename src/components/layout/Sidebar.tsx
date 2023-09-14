import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {MdOutlineAdd,MdWorkspacesFilled,MdLocalOffer} from 'react-icons/md';
import {FaUserFriends} from 'react-icons/fa';
import {BsPersonWorkspace} from 'react-icons/bs';
import {BiSolidUser} from 'react-icons/bi';
import TopicBox from './TopicBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type props = {
  isOpen:boolean,
  onClick:()=>void
}

export default function Sidebar({isOpen,onClick}:props) {
const {user} = useSelector((state:RootState) => state.user)

const topics = 
  [
    {
      title:"Browse projects",
      link:"projects",
      icon:MdWorkspacesFilled
    },
    {
      title:"Freelancers",
      link:"freelancers",
      icon:FaUserFriends
    },
  ]

const buyerTopics = [
  {
    title:"My Proposals",
    link:"proposals",
    icon:MdLocalOffer,
  },
  {
    title:"Portofolio",
    link:`${user?.id}/portofolio`,
    icon:BsPersonWorkspace
  },
]

const sellerTopics = [
  {
    title:"Add Project",
    link:"project/create",
    icon:MdOutlineAdd
  },
]

const commonTopics =
[
  {
    title:"Profile",
    link:`${user?.id}/profile`,
    icon:BiSolidUser
  },
]

  return (
    <>
      <Drawer
      style={{padding:"60px 20px"}}
      size={270}
      open={isOpen}
      onClose={onClick}
      direction="left"
      >
        {
          user?.role==="buyer"&&buyerTopics.map((item,index)=><TopicBox key={index} item={item}/>)
        }
        {
          user?.role==="seller"&&sellerTopics.map((item,index)=><TopicBox key={index} item={item}/>)
        }
        {
          user&&commonTopics.map((item,index)=><TopicBox key={index} item={item}/>)
        }
        {
          topics.map((item,index)=><TopicBox key={index} item={item}/>)
        }
      </Drawer>
    </>
  )
}
