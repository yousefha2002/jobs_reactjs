import { useQuery } from "@tanstack/react-query"
import { Portofolio } from "../types/models/portofolio.model"

const getUserPortofolios = async(id:string|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/portofolio/all/${id}`)
    return res.json()
}

export const useUserPortofolios = (id:string|undefined)=>
{
    return useQuery<Portofolio[]>({ queryKey: ['user-portofolios'], queryFn: ()=>getUserPortofolios(id) })
}

const getSinglePortofolio = async(id:string|undefined)=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/portofolio/${id}`)
    return res.json()
}

export const useSinglePortofolio = (id:string|undefined)=>
{
    return useQuery<Portofolio>({ queryKey: ['single-portofolio'], queryFn: ()=>getSinglePortofolio(id) })
}