import { observer } from "mobx-react-lite"
import { InputText } from "../../../Components/Form/InputText";
import { useForm } from "../../../Hooks/useForm/useForm";
import { BookForm } from "../../../../Data/Models/BookForm";
import { TextArea } from "../../../Components/Form/TextArea";
import "./index.css"
import { useMemo } from "react";
import container from "../../../../Data/Config/IocConfig";
import { IocViewModel } from "../../../../Data/Config/iocTypeConfig";
import { AdminViewModel } from "./ViewModel";
import { Book } from "../../../../Domain/Entities/Books";
import { BookAvailable } from "../../../../Domain/Enum/BookAvailable";

const initialState: BookForm = {
    title: "",
    author: "",
    description: "",
    year: "",
}
const View = () => {

    const { formValue, register, resetForm, setValueForm } = useForm<BookForm>(initialState);

    const viewModel = useMemo(() => container.get<AdminViewModel>(IocViewModel.Admin), [])

    const handleAddUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        let isAdded = false;

        if (viewModel.book) {
            isAdded = await viewModel.updateBook(formValue());
            viewModel.book = null;
        } else {
            isAdded = await viewModel.addBook(formValue())
        }

        if (isAdded) {
            resetForm()
            await viewModel.listBooks();
        };
    }

    const handleEditBook = (book: Book) => {
        if (viewModel.canEditBook(book)) {
            viewModel.book = book;
            setValueForm({
                title: book.title,
                author: book.author,
                description: book.description,
                year: book.year,
            })
        }
    }

    const handleDeleteBook = async (book: Book) => {
        if (viewModel.canDeleteBook(book)) {
            await viewModel.deleteBook(book);
            await viewModel.listBooks();
        }
    }

    const handleCancelEdit = () => {
        viewModel.removeForEditBook();
        resetForm();
    }

    return (
        <>
            <div className="book-form">
                <h2>ADMIN</h2>
                <form onSubmit={handleAddUser}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <InputText
                            {...register<HTMLInputElement>("title")}
                            placeholder="Ingrese el titulo" id="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Autor</label>
                        <InputText
                            {...register<HTMLInputElement>("author")}
                            placeholder="Ingresel el autor" id="author" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Año</label>
                        <InputText
                            {...register<HTMLInputElement>("year")}
                            placeholder="Ingresel el año del publicacion" type="number" id="year" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <TextArea
                            {...register<HTMLTextAreaElement>("description")}
                            placeholder="Ingrese una descripcion del libro" type="text" id="description" />
                    </div>
                    <button type="submit" disabled={viewModel.isLoading}>{viewModel.book ? "Editar" : "Agregar"}</button>
                    {viewModel.book && <button type="button" onClick={handleCancelEdit}>Cancelar</button>}
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Año</th>
                            <th>Autor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewModel.books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.year}</td>
                                <td>{book.author}</td>
                                <td>
                                    {book.available === BookAvailable.YES && (<button onClick={() => handleEditBook(book)}>Editar</button>)}
                                    {book.available === BookAvailable.YES && (<button onClick={() => handleDeleteBook(book)}>Eliminar</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default observer(View)