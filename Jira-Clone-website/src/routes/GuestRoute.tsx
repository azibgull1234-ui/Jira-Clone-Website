import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname;
    return <Navigate to={from || "/dashboard"} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
