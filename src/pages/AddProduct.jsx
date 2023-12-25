
import { TagsInput } from "react-tag-input-component";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [selected, setSelected] = useState(["Technology"]);
    const { user, loading, setLoading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const hostKey = import.meta.env.VITE_IMGBB_KEY;
    const navigate = useNavigate();

    const handleAddProduct = (product) => {

        const { pname, description } = product;



        const image = product.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${hostKey}`;
        setLoading(true);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(gotData => {
                if (gotData.success) {
                    const addproduct = {
                        name: pname,
                        author: user.displayName,
                        authorImg: user.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        img: gotData.data.url,
                        desc: description,
                        authorEmail: user.email,
                        tags: selected,
                        status: "pending",
                        timestamp: new Date().toISOString().slice(0, -5) + 'Z',
                        condition: 'featured'
                    };

                    fetch('https://techshownew.vercel.app/api/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addproduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setLoading(false);
                                toast.success('Product Added Successfully');
                                navigate('/dashboard/myproduct')
                            }
                        })
                }
            })


    };
    return (
        <div className='bg-cover bg-center bg-no-repeat bg-[#13131388] bg-blend-overlay h-[90vh] flex justify-center items-center' style={{ backgroundImage: `url(https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600)` }}>
            <div className='py-10 mx-auto md:w-[400px] shadow-lg px-6'>
                <h3 className='text-4xl font-bold text-[#19d3ae] text-center mb-8 uppercase'>Add Product</h3>
                <form onSubmit={handleSubmit(handleAddProduct)} className='space-y-3'>

                    <div>
                        <label htmlFor="pname" className='text-white font-medium  pl-2'>ProductName</label>
                        <input type="text" className="input input-bordered input-accent w-full bg-white"
                            {...register('pname', { required: true })}
                        />
                        {errors.pname && <span className='text-red-600'>Enter Product Name</span>}
                    </div>

                    <div>
                        <label htmlFor="image" className='text-white font-medium  pl-2'>UpLoad Image</label>
                        <input type="file" className="input input-bordered input-accent w-full bg-white"
                            {...register('image', { required: true })}
                        />
                        {errors.image && <span className='text-red-600'>Please upload an image</span>}
                    </div>


                    <div>
                    <label htmlFor="authorinfo" className='text-white font-medium  pl-2'>Owner Info</label>
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

                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="fruits"
                        placeHolder="Enter your tags"
                    />



                    <div>
                        <label htmlFor="description" className='text-white font-medium  pl-2'>Description</label>
                        <textarea rows={5} type="text" className="input input-bordered input-accent w-full bg-white"
                            {...register('description', { required: true })}
                        />
                        {errors.description && <span className='text-red-600'>Product description required </span>}
                    </div>



                    <div className='text-center'>
                        <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-full mx-auto">{loading ? <span className="loading loading-spinner text-info"></span> : 'Add Product'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct