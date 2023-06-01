import { inject, injectable } from "inversify";
import { IocRepositories, IocServices } from "../Config/iocTypeConfig";
import { type BookRepository } from "../../Domain/Repositories/BookRepository";
import { BookForm } from "../Models/BookForm";
import { BookFormValidatorService,  } from "../Services/Validator/BookFormValidatorService";
import BookEntity from "../Entities/BookEntity";
import { v4 as uuidV4 } from "uuid";
import { BookAvailable } from "../../Domain/Enum/BookAvailable";
import { Book } from "../../Domain/Entities/Books";

@injectable()
export class RegisterBookUseCase {
    constructor(
        @inject(IocServices.BookFormValidator)
        private readonly _bookFormValidatorService: BookFormValidatorService,
        @inject(IocRepositories.Book)
        private readonly _bookRepository: BookRepository
    ) {
    }

    public run = async (form: BookForm): Promise<Book> => {
        this._bookFormValidatorService.run(form);

        return await this._bookRepository.addBook(new BookEntity({
            id: uuidV4(),
            id_owner: null,
            title: form.title,
            author: form.author,
            description: form.description,
            year: form.year,
            available: BookAvailable.YES
        }))
    }
}