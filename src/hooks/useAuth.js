import { useContext } from "react"
import { AuthContext } from "../contexts/authContext/AuthProvider"


export const useAuth = () => {
    const all = useContext(AuthContext);
    return all;
}