import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../Context/Auth/AuthContext';
import { observer } from 'mobx-react-lite';

const Router = ({ children, redirectTo = "/auth/sign-in" }: { children: any, redirectTo?: string }) => {

    const { authStore } = useAuthContext();
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    return (authStore.user)
        ? children
        : <Navigate to={redirectTo} />
}

export default observer(Router)