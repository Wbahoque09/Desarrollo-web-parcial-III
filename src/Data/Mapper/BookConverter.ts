import BookEntity from "../Entities/BookEntity";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export class BookConverter {
  static toFirestore = (book: BookEntity): DocumentData => {
    return {
      id_owner: book.id_owner,
      title: book.title,
      author: book.author,
      description: book.description,
      year: book.year,
      available: book.available,
    };
  };

  static fromFirestore = (
    snapshot: QueryDocumentSnapshot<DocumentData>
  ): BookEntity => {
    const data = snapshot.data();
    return new BookEntity({
      id: snapshot.id,
      id_owner: data.id_owner,
      title: data.title,
      author: data.author,
      description: data.description,
      year: data.year,
      available: data.available,
    });
  };
}
