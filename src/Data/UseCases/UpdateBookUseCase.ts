import { inject, injectable } from "inversify";
import { IocRepositories, IocServices } from "../Config/iocTypeConfig";
import { BookFormValidatorService } from "../Services/Validator/BookFormValidatorService";
import { type BookRepository } from "../../Domain/Repositories/BookRepository";
import { Book } from "../../Domain/Entities/Books";

@injectable()
export class UpdateBookUseCase {
    constructor(
        @inject(IocServices.BookFormValidator)
        private readonly _bookFormValidatorService: BookFormValidatorService,
        @inject(IocRepositories.Book)
        private readonly _bookRepository: BookRepository
    ) {
    }

    public run = async (book: Book): Promise<Book> => {
        this._bookFormValidatorService.run(book);

        return await this._bookRepository.updateBook(book)
    }
}