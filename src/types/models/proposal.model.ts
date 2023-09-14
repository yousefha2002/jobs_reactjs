import { Job } from "./job.model"
import { User } from "./user.model"

export type Proposal = {
    Proposal:ProposalBox,
    name:string,
    id:number,
    image:string,
    job_title:string
}

export type ProposalBox = {
    id:number,
        createdAt:string,
        updatedAt:string,
        price:number,
        duration:number,
        content:string,
        jobId:number,
        buyerId:number,
        job:Job,
        buyer:User
}