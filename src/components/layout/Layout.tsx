import React ,{useState,ReactNode,useEffect} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'


type props = {
  children:ReactNode
}

export default function Layout({children}:props) {
  const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const location = useLocation();

    useEffect(() => {
      setIsOpen(false);
    }, [location]);


  return (
    <>
      <Navbar onClick={toggleDrawer}/>
      <Sidebar isOpen={isOpen} onClick={toggleDrawer}/>
      {
        children
      }
      <Footer/>
    </>
  )
}
