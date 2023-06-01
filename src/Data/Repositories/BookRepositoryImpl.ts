import { inject, injectable } from "inversify";
import { BookRepository } from "../../Domain/Repositories/BookRepository";
import { IocServices } from "../Config/iocTypeConfig";
import { FirestoreService } from "../Services/FIrestoreService";
import { Book } from "../../Domain/Entities/Books";
import {
  getDoc,
  doc,
  runTransaction,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { BookConverter } from "../Mapper/BookConverter";
import { collectionNames } from "../Config/CollectionNames";

@injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @inject(IocServices.Firestore)
    private readonly _firestoreService: FirestoreService
  ) { }

  getBook = async (id: string): Promise<Book | null> => {
    const docSnap = await getDoc(
      doc(this._firestoreService.db, `${collectionNames.BOOKS}/${id}`).withConverter(BookConverter)
    );

    if (!docSnap.exists()) return null;

    return docSnap.data();
  };

  addBook = async (book: Book): Promise<Book> => {
    return await runTransaction(
      this._firestoreService.db,
      async (transaction) => {
        const { id, ...rest } = book;
        const userRef = doc(this._firestoreService.db, `${collectionNames.BOOKS}/${book.id}`);

        await transaction.set(userRef, { ...rest });

        return book;
      }
    );
  };

  getBooks = async (): Promise<Book[]> => {
    const querySnapshot = await getDocs(
      collection(this._firestoreService.db, collectionNames.BOOKS).withConverter(
        BookConverter
      )
    );

    return querySnapshot.docs.map((doc) => doc.data());
  };

  getBooksByField = async (params: {
    field: keyof Book;
    value: Book[keyof Book];
  }): Promise<Book[]> => {
    const q = query(
      collection(this._firestoreService.db, collectionNames.BOOKS),
      where(params.field, "==", params.value)
    ).withConverter(BookConverter);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  };

  updateBook = async (book: Book): Promise<Book> => {
    return await runTransaction(
      this._firestoreService.db,
      async (transaction) => {
        const { id, ...rest } = book;
        const userRef = doc(this._firestoreService.db, `${collectionNames.BOOKS}/${book.id}`);
        await transaction.update(userRef, { ...rest });
        return book;
      }
    );
  };

  hasOwner = async (id: string): Promise<Boolean> => {
    const docSnap = await getDoc(
      doc(this._firestoreService.db, `${collectionNames.BOOKS}/${id}`).withConverter(BookConverter)
    );

    if (!docSnap.exists()) return false;

    const idOwner = docSnap.data().id_owner;
    const validator = (idOwner || idOwner !== "") ? true : false;
    return validator
  };


}
