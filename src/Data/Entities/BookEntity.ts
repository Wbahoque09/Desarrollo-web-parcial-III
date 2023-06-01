import { Book } from "../../Domain/Entities/Books";
import { BookAvailable } from "../../Domain/Enum/BookAvailable";

export default class BookEntity implements Book {
  public id: string;
  public id_owner: string | null;
  public title: string;
  public author: string;
  public description: string;
  public year: string;
  public available: BookAvailable;

  constructor(data: Book) {
    this.id = data.id;
    this.id_owner = data.id_owner;
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.year = data.year;
    this.available = data.available;
  }
}
