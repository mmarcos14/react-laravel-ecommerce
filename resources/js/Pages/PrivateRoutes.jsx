import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../ServiceContext/ProviderContext";

export const PrivateRoutes = ({ children }) => {
    const { user } = useAuth();

    if (user === undefined) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/login" replace />;
    }

    return children || <Outlet />;
};