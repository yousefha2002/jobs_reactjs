import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../ui/Rating'
import { User } from '../../types/models/user.model'


type props = {
    item:User
}

export default function FreelancerBox({item}:props) {
    return (
        <Link to={`/${item.id}/profile`}>
            <div className='shadow bg-[white] p-4 border border-[#eaeff2] flex items-center gap-x-2'>
                <img src={`${process.env.REACT_APP_API_KEY}/uploads/${item.image}`} alt={item.name} className='w-[85px] h-[85px] rounded-[50%]'/>
                <div>
                    <h3 className='text-Primary mb-1 font-[500]'>{item.name}</h3>
                    <Rating rate={4}/>
                    <p className='text-[15px] mt-2 text-Gray'>{item.biography.slice(0,120)}</p>
                </div>
            </div>
        </Link>
    )
}
