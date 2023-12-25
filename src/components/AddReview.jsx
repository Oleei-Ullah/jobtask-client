/* eslint-disable react/prop-types */

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const AddReview = ({id, refetch}) => {
    const { user, loading, setLoading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleReview = (review) => {

        const {  desc, rating } = review;

        const addreview = {
            author: user?.displayName,
            authorImg: user.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            review: desc,
            rating: rating,
        };

        fetch(`https://techshownew.vercel.app/api/addreview/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addreview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    toast.success('Review Added Successfully');
                    refetch();
                }
            })


    };
    return (
        <div className=' h-[90vh] flex justify-center items-center' >
            <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
                <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Add Review</h3>
                <form onSubmit={handleSubmit(handleReview)} className='space-y-3'>
                    <div >
                        <label htmlFor="authorinfo" className='text-gray-500 font-medium  pl-2'>Reviewer Info</label>
                        <div className='flex items-center justify-between'>
                            <img src={user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className='w-[50px] h-[50px] rounded-full border-2 border-white' alt="" />
                            <div className="w-[80%]">
                                <input type="text" defaultValue={user?.displayName} readOnly disabled className="input input-bordered input-accent w-full bg-white"
                                    {...register('author')}
                                />
                                {errors.author && <span className='text-red-600'>Please upload an image</span>}
                            </div>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="review" className='text-gray-600 font-medium  pl-2'>Review</label>
                        <textarea rows={5} type="text" className="input input-bordered input-accent w-full bg-white"
                            {...register('desc', { required: true })}
                        />
                        {errors.desc && <span className='text-red-600'>Product review required </span>}
                    </div>

                    <div>
                        <label htmlFor="rating" className='text-gray-600 font-medium  pl-2'>Rating</label>
                        <input type="number" max={5} min={2} className="input input-bordered input-accent w-full bg-white"
                            {...register('rating', { required: true })}
                        />
                        {errors.rating && <span className='text-red-600'>Please Rate the tech.</span>}
                    </div>



                    <div className='text-center'>
                        <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">{loading ? <span className="loading loading-spinner text-info"></span> : 'Add Review'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReview