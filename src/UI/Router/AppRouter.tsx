import { Route, Routes, useNavigate } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import LibraryRouter from "./LibraryRouter";
import { SignInView } from "../Pages/Public/SignIn";
import { SignUpView } from "../Pages/Public/SignUp";
import { observer } from "mobx-react-lite";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect } from "react";

const Router = () => {
  const navigate = useNavigate();

  const restartActivity = () => {
    const lastPath = localStorage.getItem('lastPath') || '/auth/sign-in';
    navigate(lastPath, {
      replace: true
    });
  }

  useEffect(() => {
    restartActivity()
  },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="auth/*"
          element={
            <PublicRouter>
              <Routes>
                <Route path="sign-in" element={<SignInView />} />
                <Route path="sign-up" element={<SignUpView />} />
              </Routes>
            </PublicRouter>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRouter>
              <LibraryRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
};

export default observer(Router)
