import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import container from "../../../../Data/Config/IocConfig";
import { SignInViewModel } from "./ViewModel";
import { IocViewModel } from "../../../../Data/Config/iocTypeConfig";
import { useForm } from "../../../Hooks/useForm/useForm";
import { SignInBase } from "../../../../Data/Models/SignInModel";
import { InputText } from "../../../Components/Form/InputText";
import "./index.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Context/Auth/AuthContext";

const initialState: SignInBase = {
  email: "",
  password: "",
};

const View = () => {
  const { authStore } = useAuthContext();
  const { formValue, register, resetForm } = useForm<SignInBase>(initialState);

  const viewModel = useMemo(
    () => container.get<SignInViewModel>(IocViewModel.SignIn),
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userData = await viewModel.signIn(formValue());
    if (userData) {
      authStore.addAuthInformation(userData);
      resetForm();
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Bienvenido !!</h1>
        <form onSubmit={handleSubmit}>
          <InputText
            {...register<HTMLInputElement>("email")}
            placeholder="Email"
            type="email"
          />
          <InputText
            {...register<HTMLInputElement>("password")}
            placeholder="Contraseña"
            type="password"
          />
          <button type="submit" disabled={viewModel.isLoading}>
            Iniciar sesión
          </button>
        </form>
        <p>
          No tienes una cuenta? <Link to="/auth/sign-up">Regístrate aquí</Link>
        </p>
      </div>
    </>
  );
};

export default observer(View);
