import { BookAvailable } from "../../Domain/Enum/BookAvailable";

export type BookForm = {
    title: string;
    author: string;
    description: string;
    year: string;
}