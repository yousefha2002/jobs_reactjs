export type Portofolio = {
    id: number;
    description: string;
    userId:number;
    title: string;
    photos:{
        id:number,
        projectId:number,
        path:string
    }[]
    createdAt?:string,
    user?:{
        id:number,
        name:string
    }
};
