import React from 'react'
import { Portofolio } from '../types/models/portofolio.model'
import { Link } from 'react-router-dom'

type props = {
    item:Portofolio
}

export default function PortofilioProjectBox({item}:props) {
    return (
        <Link to={`/portofolio/${item.id}`}>
            <img src={`${process.env.REACT_APP_API_KEY}/uploads/${item?.photos[0].path}`} alt='project' className='w-full h-[200px] mb-3'/>
            <h3>{item.title}</h3>
        </Link>
    )
}
