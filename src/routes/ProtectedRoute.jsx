import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const location = useLocation();
  // const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
