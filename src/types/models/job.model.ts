import { Category } from "./category.model"
import { Proposal } from "./proposal.model"

export type Job = {
    id:number,
    title:string,
    proposalCount:number,
    proposalAverage:string,
    description:string,
    createdAt:string,
    updatedAt:string,
    duration:number,
    status:string,
    level:string,
    categoryId:number,
    creator_id:number,
    offers:number,
    createdUser:{
        id:number,
        name:string,
        image:string,
        country:string
    },
    price:{
        min:number,
        max:number
    },
    proposals:Proposal[],
    category:Category
}