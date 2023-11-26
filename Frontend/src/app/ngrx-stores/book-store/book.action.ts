import { createAction, props } from "@ngrx/store";
import { BooksI } from "./book.model";

export const loadBooks = createAction("[books-page] book loading")
export const loadBooksSucces = createAction("[books-page] success", props<{bookList:BooksI[]}>());



