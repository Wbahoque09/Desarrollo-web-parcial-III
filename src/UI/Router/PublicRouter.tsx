import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/Auth/AuthContext';
import { observer } from 'mobx-react-lite';

const Router = ({ children, redirectTo = "/dashboard/home" }: { children: any, redirectTo?: string }) => {

    const { authStore } = useAuthContext();

    return (!authStore.user)
        ? children
        : <Navigate to={redirectTo} />
}

export default observer(Router)