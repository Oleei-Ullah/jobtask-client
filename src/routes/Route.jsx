import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ErrorElement from "../components/ErrorElement";
import NotFound from "../pages/NotFound";
import AddProduct from "../pages/AddProduct";
import PrivateRoutes from "./PrivateRoute";
import Dashboard from "../layout/DashBoardLayout/Dashboard";
import MyTasks from "../pages/MyTasks";

export const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorElement />}>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

            </Route>
            <Route path="/dashboard"
                element={<PrivateRoutes><Dashboard /></PrivateRoutes>}
            >
                <Route index element={<MyTasks />} />
                <Route path="/dashboard/addproduct" element={<AddProduct />} />

            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>

))