import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouterProps = {
  isAllowed?: boolean;
  redirectTo?: string;
  children?: any
};

 const Router = ({
  children,
  isAllowed,
  redirectTo = "/dashboard/home",
}: ProtectedRouterProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default observer(Router)