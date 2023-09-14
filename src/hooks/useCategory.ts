import { useQuery } from "@tanstack/react-query"
import { Category } from "../types/models/category.model"

export const getCategories = async()=>
{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/category/all`)
    return res.json()
}

export const useCategories = ()=>
{
    return useQuery<Category[]>({ queryKey: ['categories'], queryFn:getCategories})
}