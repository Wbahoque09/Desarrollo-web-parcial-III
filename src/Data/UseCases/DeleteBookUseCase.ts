import { inject, injectable } from "inversify";
import { IocRepositories } from "../Config/iocTypeConfig";
import { type BookRepository } from "../../Domain/Repositories/BookRepository";
import { Book } from "../../Domain/Entities/Books";
import { BookAvailable } from "../../Domain/Enum/BookAvailable";

@injectable()
export class DeleteBookUseCase {
    constructor(
        @inject(IocRepositories.Book)
        private readonly _bookRepository: BookRepository
    ) {
    }

    public run = async (book: Book): Promise<Book> => {
        if (book.available === BookAvailable.YES) {
            return await this._bookRepository.updateBook({
                ...book,
                available: BookAvailable.NO
            })
        }

        return book;

    }
}