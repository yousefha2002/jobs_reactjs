import React ,{useState}from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { addPortofolioType } from '../types/addPortofolio';
import { toast } from 'react-hot-toast';
import {BiImageAdd} from 'react-icons/bi'
import ImageAdded from '../components/ui/ImageAdded';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function CreatePortofolio() {
    const { register, handleSubmit ,formState:{errors}} = useForm<addPortofolioType>()
    const [images,setImages] = useState<File[]>([]);
    const {token} = useSelector((s:RootState)=>s.user);

    const addImage = (file:File)=>{
        setImages(pre=>[...pre ,file]);
    }
    const handleDeleteImage=(ind:number)=>{
        setImages(pre=>pre.filter((val,index)=>index!==ind));
    }

    const {mutateAsync , isLoading} = useMutation(handleUpdateProfile);
    const onSubmit: SubmitHandler<addPortofolioType> = (data) => mutateAsync(data);
    
    async function handleUpdateProfile(dataForm:addPortofolioType)
    {
        if(images.length===0){
            toast.error("Upload one image at least",{position:"top-center"});
            return;
        }
    const formData = new FormData();
    images.forEach((file) => {
        formData.append(`images`, file);
    });
        formData.append('description',dataForm.description);
        formData.append('title',dataForm.title);
        try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/portofolio/create`,{
            method:"POST",
            headers:{
                "Authorization":token,
            },
            body:formData
        })
        const data = await response.json()
        if(response.status!==200&&response.status!==201)
        {
            toast.error(data.message,{position:"top-center"});
            throw new Error('failed occured')
        }
        toast.success(data.message,{position:"top-center"});
        }
        catch(err){
            console.log(err)
        }
    }

    const data=[
        {
            id:1,
            title:"Start building your portfolio",
            desc:"Add your previous work that you have implemented, adding business to the profile helps entrepreneurs know your skills and increases your chances of employment."
        },
        {
            id:2,
            title:"Your works denote your skills and experience",
            desc:"Post high-quality work and keep it up-to-date with the new techniques and skills you acquire."
        }
    ]

return (
    <div className='pt-8 pb-20 bg-bgGray min-h-[90vh]'>
            <div className='Container'>
                <h3 className='text-[22px] font-[500] mb-8'>Add New Work</h3>
                <div className=' grid grid-cols-12 gap-8'>
                    <form className=' md:col-span-9 col-span-12 bg-white p-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col mb-8'>
                            <label className='text-[16px] block mb-3'>Work Title</label>
                            <input {...register("title",{required:true})}
                            autoComplete='off'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
                        {errors.title?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
                        </div>
                        <div className='flex flex-col mb-8'>
                            <label className='text-[16px] block mb-3'>Work Description</label>
                            <textarea {...register("description",{required:true})}
                            autoComplete='off' rows={7}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
                        {errors.description?.type==="required" && <p className='mt-2 text-[14px] text-red-600'>This Filed Is Required</p>}
                        </div>
                        <div className="mb-[10px]">
                        <label htmlFor='images'>
                            <div className='flex items-center w-full gap-x-2 justify-center h-[80px] border-[1px] border-gray-500 border-dashed'>
                                <h5 className='text-[15px] font-[600]'>Pick Image</h5>
                                <div><BiImageAdd className='text-[22px]'/></div>
                            </div>
                        </label>
                        <input onChange={(e)=>{e.target.files &&addImage(e.target.files[0])}} hidden type='file' id="images" accept="image/png, image/jpeg" />
                        <hr/>
                        <div className='mt-5 grid grid-cols-4 gap-5'>
                            {
                                images.length>0 && images.map((img,index)=>{
                                    return <ImageAdded index={index} image={img} handleDeleteImage={handleDeleteImage}/>
                                })
                            }
                        </div>
                        </div>
                        {
                            isLoading
                            ?
                            <button className='bg-Primary py-2 px-5 text-[white] rounded opacity-80'>...</button>
                            :
                            <button type="submit" className='bg-Primary py-2 px-5 text-[white] rounded hover:opacity-80 duration-300'>Save</button>
                        }
                    </form>
                    <div className='col-span-3 md:block hidden'>
                    {
                        data.map(da=>{
                            return <div key={da.id} className='mb-8'>
                                <h5 className=' text-[16px] mb-2'>{da.title}</h5>
                                <p className='text-[14px]'>{da.desc}</p>
                            </div>
                        })
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePortofolio