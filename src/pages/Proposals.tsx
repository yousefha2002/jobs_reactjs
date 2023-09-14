import React from 'react'
import ProjectBox from '../components/browseprojects/ProjectBox'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useProposals } from '../hooks/userProposal'
import Loading from '../components/ui/Loading'


export default function Proposals() {
    const {user,token} = useSelector((state:RootState) => state.user)

    const {data,isLoading} = useProposals(token)
    console.log(data)

    return (
        <div className='py-8 bg-bgGray'>
            <div className='Container'>
                <h3 className='text-[22px] font-[500] mb-8'>My Proposals</h3>
                {
                    !isLoading?
                    data?.map(item=><ProjectBox proposal={item} isProposal={true} key={item.id}/>)
                    :
                    <Loading/>
                }
            </div>
        </div>
    )
}
