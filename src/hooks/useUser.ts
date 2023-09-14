import { useQuery } from "@tanstack/react-query"
import { User, UserCard } from "../types/models/user.model"

const getSingleUser = async(id:number|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/user/${id}`)
    return res.json()
}

export const useSingleUser = (id:number|undefined)=>
{
    return useQuery<User>({ queryKey: ['single-user'], queryFn: ()=>getSingleUser(id),refetchOnWindowFocus:false })
}

export const getFreelancers = async(search:string)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/user/freelancers/all?search=${search}`)
    return res.json()
}

export const useFreelancers = (search:string)=>
{
    return useQuery<User[]>({ queryKey: ['freelancers',search], queryFn:()=>getFreelancers(search)})
}

const getUserCard = async(id:number|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/user/${id}/card`)
    return res.json()
}

export const useUserCard = (id:number|undefined)=>
{
    return useQuery<UserCard>({ queryKey: ['user-card'], queryFn: ()=>getUserCard(id),refetchOnWindowFocus:false })
}