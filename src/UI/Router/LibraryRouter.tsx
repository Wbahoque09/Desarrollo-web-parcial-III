import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeView } from "../Pages/Private/Home";
import { AdminView } from "../Pages/Private/Admin";
import ProtectedRouter from "./ProtectedRouter";
import { useAuthContext } from "../Context/Auth/AuthContext";
import { TypeUser } from "../../Domain/Enum/TypeUser";

const Router = () => {
  const { authStore } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/dashboard/home" element={<HomeView />} />
        <Route path="/dashboard/admin" element={
          <ProtectedRouter isAllowed={authStore.user?.type_user === TypeUser.ADMIN}>
            <AdminView />
          </ProtectedRouter>}
        />
        <Route path="" element={<Navigate to="/dashboard/home" />} />
      </Routes>
    </>
  );
};

export default observer(Router)
