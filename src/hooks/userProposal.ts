import { useQuery } from "@tanstack/react-query"
import { ProposalBox } from "../types/models/proposal.model"

export const getProposals = async(token:string)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/proposal/all`,{
        headers:{
            "authorization":token
        }
    })
    return res.json()
}

export const useProposals = (token:string)=>
{
    return useQuery<ProposalBox[]>({ queryKey: ['proposals'], queryFn:()=>getProposals(token)})
}