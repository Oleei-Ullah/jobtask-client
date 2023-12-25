/* eslint-disable react/prop-types */


import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const AddTask = ({refetch}) => {
    const { user, loading, setLoading } = useAuth();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleAddTask = (product) => {

        const { pname, description } = product;



        const addTask = {
            title: pname,
            author: user.displayName,
            description: description,
            authorEmail: user.email,
            status: "todos",
            priority: "high",
            deadline: new Date().toISOString().slice(0, -5) + 'Z',
        };

        fetch('http://localhost:5000/api/addtask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    reset();
                    toast.success('Product Added Successfully');
                    refetch()
                }
            })

    };
    return (
        <div className='bg-cover bg-center bg-no-repeat bg-[#13131388] bg-blend-overlay min-h-[300px] flex justify-center items-center' style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr__ckDxTNiIPWpJyhbOMjzO49maC6JzlRQBGcTYzsiw&s)` }}>
            <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
                <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Add Task</h3>
                <form onSubmit={handleSubmit(handleAddTask)} className='space-y-3'>

                    <div>
                        <label htmlFor="pname" className='text-white font-medium  pl-2'>Title</label>
                        <input type="text" className="input input-bordered input-accent w-full bg-white"
                            {...register('pname', { required: true })}
                        />
                        {errors.pname && <span className='text-red-600'>Enter Title</span>}
                    </div>






                    <div>
                        <label htmlFor="description" className='text-white font-medium  pl-2'>Description</label>
                        <textarea rows={5} type="text" className="input input-bordered input-accent w-full bg-white"
                            {...register('description', { required: true })}
                        />
                        {errors.description && <span className='text-red-600'>Task description required </span>}
                    </div>



                    <div className='text-center'>
                        <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">{loading ? <span className="loading loading-spinner text-info"></span> : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask