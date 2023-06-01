import { BookAvailable } from "../Enum/BookAvailable";

export interface Book {
  id: string;
  id_owner: string | null;
  title: string;
  author: string;
  description: string;
  year: string;
  available: BookAvailable;
}
