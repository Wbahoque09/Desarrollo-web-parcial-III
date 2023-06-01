import { inject, injectable } from "inversify";
import { action, autorun, makeObservable, observable } from "mobx";
import { Book } from "../../../../Domain/Entities/Books";
import { IocUseCases } from "../../../../Data/Config/iocTypeConfig";
import { RegisterBookUseCase } from "../../../../Data/UseCases/RegisterBookUseCase";
import { UpdateBookUseCase } from "../../../../Data/UseCases/UpdateBookUseCase";
import { BookForm } from "../../../../Data/Models/BookForm";
import Swal from "sweetalert2";
import { ListBookUseCase } from "../../../../Data/UseCases/ListBookUseCase";
import { DeleteBookUseCase } from "../../../../Data/UseCases/DeleteBookUseCase";

@injectable()
export class AdminViewModel {
    @observable public book: Book | null = null;
    @observable public isLoading: boolean = false;
    @observable public books: Book[] = [];

    constructor(
        @inject(IocUseCases.RegisterBook) private readonly _registerBookUseCase: RegisterBookUseCase,
        @inject(IocUseCases.ListBook) private readonly _listBookUseCase: ListBookUseCase,
        @inject(IocUseCases.UpdateBook) private readonly _updateBookUseCase: UpdateBookUseCase,
        @inject(IocUseCases.DeleteBook) private readonly _deleteBookUseCase: DeleteBookUseCase
    ) {
        makeObservable(this)
        autorun(() => {
            this.listBooks()
        })
    }

    @action
    public removeForEditBook = () => {
        this.book = null
    };

    @action
    public canEditBook = (book: Book) => {
        if (book.id_owner !== null) {
            Swal.fire("Error al editar", "No se puede editar por que este libro esta en prestamo", "error");
            return false;
        }

        if (this.book) {
            if (this.book?.id !== book.id) {
                Swal.fire("Error al editar", "No se puede editar por que esta editando un libro en este momento", "error");
                return false;
            }

            if (this.book?.id === book.id) {
                Swal.fire("Error al editar", "El libro ya esta siendo editado", "error");
                return false;
            }

        }

        return true;
    }

    @action
    public canDeleteBook = (book: Book) => {
        if (book.id_owner !== null) {
            Swal.fire("Error al eliminar", "No se puede eliminar por que este libro esta en prestamo", "error");
            return false;
        }

        if (this.book) {
            if (this.book.id === book.id) {
                Swal.fire("Error al eliminar", "No se puede eliminar por que esta siendo editado", "error")
                return false;
            }

            Swal.fire("Error al eliminar", "No se puede eliminar por que esta editando un libro", "error")
            return false;
        }

        return true;
    }

    @action
    public addBook = async (data: BookForm): Promise<boolean> => {
        try {
            this.isLoading = true;
            await this._registerBookUseCase.run(data)
            return true;
        } catch (error) {
            Swal.fire("Error", (error as Error).message, 'error')
        } finally {
            this.isLoading = false;
        }

        return false;
    }

    @action
    public listBooks = async (): Promise<void> => {
        try {
            this.isLoading = true;
            const bookAdded = await this._listBookUseCase.run();
            this.books = bookAdded;
        } catch (error) {
            Swal.fire("Error", (error as Error).message, 'error')
        } finally {
            this.isLoading = false;
        }
    }

    @action
    public updateBook = async (data: Partial<Book>): Promise<boolean> => {
        try {
            this.isLoading = true;
            const dataToUpdate = {
                ...this.book,
                ...data
            }
            await this._updateBookUseCase.run(dataToUpdate as Book)
            return true;
        } catch (error) {
            Swal.fire("Error", (error as Error).message, 'error')
        } finally {
            this.isLoading = false;
        }

        return false;
    }

    @action
    public deleteBook = async (book: Book): Promise<boolean> => {
        try {
            this.isLoading = true
            await this._deleteBookUseCase.run(book as Book)
            return true;
        } catch (error) {
            Swal.fire("Error", (error as Error).message, 'error')
        } finally {
            this.isLoading = false;
        }

        return false;
    }


}