import { Navigate, Outlet } from "react-router";
import { token } from "../../helpers/token";

const PrivateRoute = () => {
  return token.isAuthorized() ? <Outlet /> : <Navigate to="/auth" replace />;
};
export default PrivateRoute;
