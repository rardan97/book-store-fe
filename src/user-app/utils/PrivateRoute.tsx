import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthUser } from "../context/AuthContextUser";


interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthUser();

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;