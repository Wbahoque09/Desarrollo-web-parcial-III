import { inject, injectable } from "inversify";
import { IocRepositories } from "../Config/iocTypeConfig";
import { type BookRepository } from "../../Domain/Repositories/BookRepository";
import { Book } from "../../Domain/Entities/Books";

@injectable()
export class ListBookUseCase {
    constructor(
        @inject(IocRepositories.Book)
        private readonly _bookRepository: BookRepository
    ) {
    }

    public run = async (): Promise<Book[]> => {
        return await this._bookRepository.getBooks();
    }
}