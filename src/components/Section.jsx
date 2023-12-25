/* eslint-disable react/prop-types */
import {  useDrop } from "react-dnd";
import SingleTask from "./SingleTask";
import toast from "react-hot-toast";


const Section = ({ tasks, status, refetch }) => {

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: 'task',
          drop: (item) => addItem(item.id),
          collect: (monitor) => ({
            isOver: monitor.isOver()
          })
        }),
        []
      )

      const addItem = (id) => {
        fetch(`http://localhost:5000/api/update/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: status})
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("updation successfully done");
                    refetch();
                } else {
                    toast.error(data.message)
                }
            })
      };


    const todos = tasks?.filter(t => t.status === "todos")
    const ongoing = tasks?.filter(t => t.status === "ongoing")
    const completed = tasks?.filter(t => t.status === "completed")
    let taskToMap;
    let bg;

    if (status === 'todos') {
        taskToMap = todos;
        bg = 'bg-slate-500'
    }

    if (status === 'ongoing') {
        taskToMap = ongoing;
        bg = 'bg-purple-500'
    }

    if (status === 'completed') {
        taskToMap = completed;
        bg = 'bg-green-500'
    }




    return (
        <div ref={drop} className="w-[30%]">
            <div className={`h-12 flex items-center pl-4 rounded-md uppercase text-white ${bg} text-sm`}>
                {status}
                <div className="ml-2 bg-white h-5 w-5 rounded-full text-black flex items-center justify-center">{taskToMap?.length}</div>
            </div>

            {
                taskToMap?.length > 0 &&
                taskToMap.map((task) => <SingleTask key={task._id} task={task} refetch={refetch} />)
            }
        </div>
    )
}

export default Section