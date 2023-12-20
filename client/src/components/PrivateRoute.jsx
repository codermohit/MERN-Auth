import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../redux/user/useUser";

export default function PrivateRoute() {
  const { currentUser } = useUser();
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
