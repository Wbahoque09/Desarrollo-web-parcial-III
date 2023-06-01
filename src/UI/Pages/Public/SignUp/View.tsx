import { observer } from "mobx-react-lite";
import "./index.css"
import { useMemo } from "react";
import { IocViewModel } from "../../../../Data/Config/iocTypeConfig";
import container from "../../../../Data/Config/IocConfig";
import { SignUpViewModel } from "./ViewModel";
import { useForm } from "../../../Hooks/useForm/useForm";
import { SignUpBaseData } from '../../../../Data/Models/SignUpModel';
import { InputText } from "../../../Components/Form/InputText";
import { useAuthContext } from "../../../Context/Auth/AuthContext";

const initialState: SignUpBaseData = {
  first_name: "",
  second_name: "",
  first_lastname: "",
  second_lastname: "",
  email: "",
  password: "",
  address: "",
  cell_phone: "",
  dni: "",
  birth_date: ""
}

const View = () => {
  const { authStore } = useAuthContext();
  const { formValue, register, resetForm } = useForm<SignUpBaseData>(initialState);

  const viewModel = useMemo(() => container.get<SignUpViewModel>(IocViewModel.SignUp), [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userData = await viewModel.register(formValue())
    if (userData) {
      authStore.addAuthInformation(userData);
      resetForm();
    }
  };

  return (
    <>
      <div className="registration-form">
        <h2>Registro</h2>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Primer Nombre</label>
              <InputText {...register<HTMLInputElement>("first_name")} placeholder='Ingrese Primer Nombre' type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Primer Apellido</label>
              <InputText {...register<HTMLInputElement>("first_lastname")} placeholder='Ingrese Primer Apellido' type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="secondName">Segundo Nombre</label>
              <InputText {...register<HTMLInputElement>("second_name")} placeholder='Ingrese Segundo Nombre' type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="secondLastName">Segundo Apellido</label>
              <InputText {...register<HTMLInputElement>("second_lastname")} placeholder='Ingrese Segundo apellido' type="text" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <InputText {...register<HTMLInputElement>("email")} placeholder='Ingrese correo electronico' type="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <InputText {...register<HTMLInputElement>("password")} placeholder='Ingrese Contraseña' type="password" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <InputText {...register<HTMLInputElement>("address")} placeholder='Ingrese Direccion' type="text" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Número de Celular</label>
              <InputText {...register<HTMLInputElement>("cell_phone")} placeholder='Ingrese No.Celular' type="tel" />
            </div>
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <InputText {...register<HTMLInputElement>("dni")} placeholder='Ingrese DNI' type="text" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Fecha de Cumpleaños</label>
            <InputText {...register<HTMLInputElement>("birth_date")} placeholder='Ingrese Fecha de cumpleaños: DD/MM/AA' type="date" />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </>
  )
};

export default observer(View);
