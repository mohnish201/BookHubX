import { createFeatureSelector, createSelector } from "@ngrx/store";
import { bookAppState } from "./book.reducer";


const getbooksState = createFeatureSelector<bookAppState>("bookReducer");


export const bookList = createSelector(getbooksState, (state) => {
    return state.bookList
})

export const loading = createSelector(getbooksState, (state) => {
    return state.loading
})