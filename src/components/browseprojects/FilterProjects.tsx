import { UseFormWatch ,UseFormRegister} from 'react-hook-form'
import { FilterForm } from '../../types/FilterForm'
import { useCategories } from '../../hooks/useCategory';

type props = {
    register:UseFormRegister<FilterForm>,
    watch:UseFormWatch<FilterForm>;
}

export default function FilterProjects({register,watch}:props) {
    const {data,isLoading} = useCategories()

    return (
        <form>
            <div className='flex flex-col mb-8'>
                <label className='text-[16px] block mb-3'>Search</label>
                <input {...register("search")}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-md duration-300 rounded-[2px] outline-none focus:bg-bgPrimary focus:ring-Primary focus:border-Primary block w-full px-2 py-1'/>
            </div>
            <div>
                <div className='mb-8'>
                    <label className='text-[16px] block mb-2'>Categories</label>
                    {!isLoading&&data?.map(item => (
                    <div key={item.id} className='mb-3'>
                        <input
                            type='checkbox'
                            {...register('categories', { required: false })}
                            className="w-4 h-4 mr-2 text-Primary bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                            value={item.id}
                            id={`category-${item.id}`}
                        />
                        <label htmlFor={`category-${item.id}`}>{item.title}</label>
                    </div>
                    ))}
                </div>
                <div>
                    <label className='text-[16px] block mb-2'>Budget</label>
                    <div>
                        <input type="range" className="w-full accent-Primary" 
                        min="500"
                        max="10000"
                        step="500" list="tickmarks"{...register("price")}/>
                        <h3 className="text-end text-Gray relative">{watch('price')}</h3>
                    </div>
                </div>
            </div>
        </form>
    )
}
