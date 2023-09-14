import { UseFormRegister } from "react-hook-form"
import { FilterForm } from "../../types/FilterForm"

type props = {
    register:UseFormRegister<FilterForm>
}

export default function FilterFreelancers({register}:props) {
    return (
        <div>
            <div className='flex flex-col mb-2'>
                <label className='text-[16px] block mb-3'>Search</label>
                <input {...register("search")}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:bg-bgPrimary focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            </div>
        </div> 
    )
}
