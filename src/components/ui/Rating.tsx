import React,{useState} from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type props = {
    rate:number
}

export default function Rating({rate}:props) {
    const [number, setNumber] = useState(rate);
    const [hoverStar, setHoverStar] = useState(0);
    return (
        <div className='flex'>
            {
            Array(5)
                .fill(null)
                .map((_, index) =>
                    number >= index + 1 || hoverStar >= index + 1 ? (
                    <AiFillStar
                        key={index}
                        onMouseOver={() => !number && setHoverStar(index + 1)}
                        onMouseLeave={() => setHoverStar(0)}
                        style={{ color: "orange" }}
                        onClick={() => !rate&&setNumber(index + 1)}
                    />
                    ) : (
                    <AiOutlineStar
                        key={index}
                        onMouseOver={() => !number && setHoverStar(index + 1)}
                        onMouseLeave={() => setHoverStar(0)}
                        style={{ color: "orange" }}
                        onClick={() => !rate&&setNumber(index + 1)}
                    />
                    )
                )}
        </div>
    )
}
