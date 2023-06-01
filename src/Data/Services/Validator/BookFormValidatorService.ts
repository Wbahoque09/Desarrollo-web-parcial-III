import { injectable } from "inversify"
import { InvalidFormException } from "../../../Domain/Exceptions"
import { BookForm } from "../../Models/BookForm"

@injectable()
export class BookFormValidatorService {
    public run = (form: BookForm) => {
        if (!form.title || form.title === ""){
            throw new InvalidFormException("Debe asignar un titulo al libro")
        }

        if (!form.author || form.author === ""){
            throw new InvalidFormException("Debe asignar un autor al libro")
        }

        if (!form.description || form.description === ""){
            throw new InvalidFormException("Debe asignar una descripcion al libro")
        }

        if (!form.year || Number.isNaN(form.author) || Number(form.author) < 0){
            throw new InvalidFormException("Debe asignar un autor al libro")
        }
    }
}