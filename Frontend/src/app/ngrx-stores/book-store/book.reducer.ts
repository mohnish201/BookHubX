import { createReducer, on } from "@ngrx/store";
import { loadBooks, loadBooksSucces } from "./book.action";
import { BooksI } from "./book.model";


export interface bookAppState {
    loading: boolean,
    bookList: BooksI[],
    error: boolean
}

const initState: bookAppState = {
    loading: false,
    bookList: [],
    error: false
}

export const bookReducer = createReducer(initState,
    on(loadBooks, (state) => ({ ...state, loading: true })),
    on(loadBooksSucces, (state, action) => ({ ...state, loading: false, bookList: action.bookList }))
)