import { useQuery } from "@tanstack/react-query"
import { Job } from "../types/models/job.model"

export const getJobs = async(search:string,price:number|undefined,categories:string[]|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/job/all?search=${search}&price=${price}&categories=[${categories}]`)
    return res.json()
}

export const useJobs = (search:string,price:number|undefined,categories:string[]|undefined)=>
{
    return useQuery<Job[]>({ queryKey: ['jobs',search,price,categories], queryFn:()=>getJobs(search,price,categories)})
}

export const getJob = async(id:string|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/job/${id}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json()
}

export const useJob = (id:string|undefined)=>
{
    return useQuery<Job>({ queryKey: ['jobs',id], queryFn:()=>getJob(id)})
}

export const getSllerJobs = async(id:string|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/job/${id}/all`)
    return res.json()
}

export const useSellerJobs = (id:string|undefined)=>
{
    return useQuery<Job[]>({ queryKey: ['seller-jobs'], queryFn:()=>getSllerJobs(id)})
}