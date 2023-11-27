import { createAction, props } from "@ngrx/store";
import { BooksI } from "./book.model";

export interface query{
    category:String,
    authorName:String,
    bookTitle:String,
    searchText:String
}

export const loadBooks = createAction("[books-page] book loading")
export const loadBooksSucces = createAction("[books-page] success", props<{ bookList: BooksI[] }>());



