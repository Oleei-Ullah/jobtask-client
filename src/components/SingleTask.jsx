/* eslint-disable react/prop-types */
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import { useDrag } from "react-dnd";

const SingleTask = ({ task, refetch }) => {
    const { title, description, _id } = task

    const [{ isDragging }, drag] = useDrag(
        () => ({
          type: 'task',
          item: {id: _id},
          collect: (monitor) => ({
            isDragging: monitor.isDragging()
          })
        }),
        []
      )
      console.log(isDragging)

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/api/deleteproduct/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success('Successfully Deleted');
                            refetch();
                        } else {
                            toast.error(data.message)
                        }
                    })
            }
        });


    };
    return (
        <div
        ref={drag}
            className={`relative ${isDragging ? "opacity-25" : "opacity-100"} p-4 mt-8 rounded-md shadow-md cursor-grab bg-gray-400 text-black`}
        >
            <h2 className="text-sm font-bold ">{title}</h2>
            <p className="text-xs mr-4">{description}</p>
            <div onClick={() => handleDelete(_id)} className="absolute cursor-pointer right-1 top-[50%] text-red-600">
                <RiDeleteBin6Line size={20} className="ml-2" />
            </div>
        </div>
    )
}

export default SingleTask