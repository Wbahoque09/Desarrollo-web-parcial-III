import './index.css'; // Agrega el archivo de estilos CSS
import { observer } from 'mobx-react-lite';
import { useAuthContext } from '../../Context/Auth/AuthContext';
import { TypeUser } from '../../../Domain/Enum/TypeUser';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const { authStore } = useAuthContext()

    const handleLogout = () => {
        authStore.logOut()
        console.log("CLICK")
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="navbar-menu">
                        {authStore.isLogged ? (
                            <>
                                {
                                    authStore.user?.type_user === TypeUser.ADMIN && (
                                        <li className="navbar-item">
                                            <Link className="navbar-item-link" to="/dashboard/admin">Administracion</Link>
                                        </li>
                                    )
                                }
                                <li className="navbar-item">
                                    <Link className="navbar-item-link" to="/dashboard/home">Inicio</Link>
                                </li>
                                <li className="navbar-item">
                                    <span className="navbar-item-link" onClick={handleLogout}>Cerrar sesion</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="navbar-item"><h2>App library</h2></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default observer(Navbar)