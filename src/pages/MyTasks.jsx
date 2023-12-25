import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import Loader from "../components/Loader";
import Section from "../components/Section";


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
            className="flex gap-16">

                {statuses.map((status,index) => <Section refetch={refetch} status={status} tasks={tasks} key={index}/>)}


        </motion.div>
    )
}

export default MyTasks