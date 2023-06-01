import { Book } from '../Entities/Books';

export interface BookRepository {
  getBook: (id: string) => Promise<Book | null>;
  addBook: (book: Book) => Promise<Book>;
  getBooks: () => Promise<Book[]>;
  getBooksByField: (params: {
    field: keyof Book;
    value: Book[keyof Book];
  }) => Promise<Book[]>;
  updateBook: (book: Book) => Promise<Book>;
  hasOwner: (id: string) => Promise<Boolean>
}
