
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types"
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) {
        return <div className='flex items-center justify-center py-6'><progress className="progress w-56"></progress></div>
    }

    if(!user) {
        return <Navigate to={'/login'} state={{from: location}} replace />
    }
    return children;
}

export default PrivateRoutes

PrivateRoutes.propTypes = {
    children: PropTypes.node
}