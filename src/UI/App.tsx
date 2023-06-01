import "./index.css"
import { AuthProvider } from './Context/Auth/AuthProvider';
import { observer } from "mobx-react-lite";
import AppRouter from './Router/AppRouter';

const App = () => {
  return (
    <>
      <AuthProvider>
         <AppRouter/>
      </AuthProvider>
    </>
  );
};

export default observer(App);
