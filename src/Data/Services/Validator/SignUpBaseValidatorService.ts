import { injectable } from "inversify";
import { InvalidFormException } from "../../../Domain/Exceptions";
import { type SignUpBaseData } from "../../Models/SignUpModel";

@injectable()
export class SignUpBaseValidatorService {
    public run = (form: SignUpBaseData) => {
        if (!form.first_name || form.first_name === "") {
            throw new InvalidFormException("El primer nombre no debe estar vacio");
          }
      
          if (!form.first_lastname || form.first_lastname === "") {
            throw new InvalidFormException("El primero apellido no debe estar");
          }
      
          if (!form.second_lastname || form.second_lastname === "") {
            throw new InvalidFormException("El segundo apellido no debe estar");
          }
      
          if (
            !form.password ||
            form.password === "" ||
            (form.password.length > 6 && form.password.length <= 8)
          ) {
            throw new InvalidFormException("La contraseña debe tener un minimo de 6 caracteres y maximo 8");
          }
      
          if (!form.email || form.email === "") {
            throw new InvalidFormException("El correo no es valido");
          }
      
          if (!form.dni || Number.isNaN(form.dni)) {
            throw new InvalidFormException("El numero de identificacion no es valido");
          }
      
          if (!form.cell_phone || Number.isNaN(form.cell_phone)) {
            throw new InvalidFormException("El numero de telefono no es valido");
          }
      
          if (!form.birth_date) {
            throw new InvalidFormException("La fecha de nacimient no debe estar vacia");
          }
      
          if (!form.address || form.address === "") {
            throw new InvalidFormException("La direccion no debe estar vacia");
          }
    }
}