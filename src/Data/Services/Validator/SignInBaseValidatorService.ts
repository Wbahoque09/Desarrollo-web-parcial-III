import { injectable } from "inversify";
import { InvalidFormException } from "../../../Domain/Exceptions";
import { SignInBase } from "../../Models/SignInModel";

@injectable()
export class SignInBaseValidatorService {
    public run = (form: SignInBase) => {
        if (!form.password ||
            form.password === "" ||
            (form.password.length > 6 && form.password.length <= 8)) {
            throw new InvalidFormException("La contraseña o el correo no valido");
        }

        if (!form.email || form.email === "") {
            throw new InvalidFormException("La contraseña o el correo no valido");
        }
    }
}