import { useNavigate, useRouteError } from "react-router-dom"
import useTitle from "../hooks/useTitle";

const ErrorElement = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    useTitle('Error')

    const handleNavigate = () => {
        navigate('/')
    };
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="text-center">
                <h1 className="text-red-600 font-semibold text-lg md:text-2xl">Oops! Something Happened Wrong</h1>

                {error.status && error.status == '404' ? <p className="text-sm text-center text-red-500 py-6">{error.statusText} with {error.status} error code.</p> : ''}

                <button className="bg-blue-600 px-4 py-2 rounded text-white inline-block " onClick={handleNavigate}>Go Home</button>
            </div>
        </div>
    )
}

export default ErrorElement