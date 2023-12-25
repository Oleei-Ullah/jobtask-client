/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment"
import Loader from "./Loader"
import SectionHeading from "./SectionHeading"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiSolidUpvote } from "react-icons/bi";

const Trending = () => {
    const [sort, setSort] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: trendingProducts, isLoading, isError, refetch } = useQuery({
        queryKey: ['trendingProducts', sort],
        queryFn: () => fetch(`https://techshownew.vercel.app/api/trendproduct/?sort=${sort ? 'asc' : 'desc'}`)
            .then(res => res.json())
    })


    const handleVote = (id) => {
        if (!user) {
            navigate('/login')
        }
        fetch(`https://techshownew.vercel.app/api/upvote/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Upvote successfully done");
                    refetch();
                } else {
                    toast.error(data.message)
                }
            })
    };

    if (isLoading) return <Loader />
    if (isError) return (
        <div className='flex items-center justify-center h-[80vh]'>
            <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
        </div>
    )
    if (trendingProducts.length) return (
        <div className="container mx-auto px-3">
            <SectionHeading heading={"Trending Products"} />
            <button onClick={() => setSort(!sort)} className="bg-gray-300 text-center mx-auto my-3 inline-block px-2 rounded-e-md min-w-[200px]">
                <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold inline-block text-2xl font-lora text-center">Sort By vote count {sort ? "Low to High" : "Hight ot low"}</h1>
            </button>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    trendingProducts.map(({ img, _id, name, desc, timestamp, authorEmail, upvotes }) => {
                        return <div key={_id} className="card bg-base-100 shadow-xl">
                            <figure><img className="w-full h-[300px]" src={img} alt={name} /></figure>
                            <div className="card-body">
                                <h2 onClick={() => navigate(`/product/${_id}`)} className="card-title cursor-pointer">{name}</h2>
                                <p>{desc}</p>
                                <p>{moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleVote(_id)} disabled={user?.email === authorEmail ? true : false} className="btn btn-primary">{user?.email === authorEmail ? `Own Product | Votes: ${upvotes.length}` : upvotes.length}<BiSolidUpvote /></button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="flex items-center">
                <button onClick={() => navigate('/allproducts')} className="bg-gray-300 text-center mx-auto my-3 inline-block px-2 rounded-e-md min-w-[200px]">
                    <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold inline-block text-2xl font-lora text-center">Show All Products</h1>
                </button>
            </div>
        </div>
    )
}

export default Trending