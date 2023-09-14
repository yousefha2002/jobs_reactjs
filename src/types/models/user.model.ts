import { Proposal } from "./proposal.model";

export type User = {
  id: number;
  email: string;
  name: string;
  country: string;
  image: string;
  biography: string;
  role: string;
  job_title: string,
  proposals:Proposal[]
};

export type UserCard = {
  createdAt:string
}