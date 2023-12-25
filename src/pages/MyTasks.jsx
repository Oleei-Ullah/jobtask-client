import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import Loader from "../components/Loader";
import Section from "../components/Section";
import AddTask from "./AddProduct";


const MyTasks = () => {
    const { user } = useAuth();
    useTitle('My Products')


    const { data: tasks, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`https://jobtaskphero.vercel.app/api/tasks?email=${user?.email}`)
            .then(res => res.json())
    })


    const statuses = ['todos', 'ongoing', 'completed'];


    if (isLoading) return <Loader />
    if (isError) return (
        <div className='flex items-center justify-center h-[80vh]'>
            <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
        </div>
    )
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: .1 } }}
            className="">
            <AddTask refetch={refetch} />
            <div>

                <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold flex items-center justify-center py-10 text-2xl font-lora text-center">My Tasks</h1>

                <div className="flex flex-col md:flex-row gap-16">
                    {statuses.map((status, index) => <Section refetch={refetch} status={status} tasks={tasks} key={index} />)}

                </div>
            </div>




        </motion.div>
    )
}

export default MyTasks