import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BookService } from '../../services/book.service';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { loadBooks, loadBooksSucces } from './book.action';

@Injectable()

export class BooksEffects {

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBooks),
            exhaustMap((action) => {
                return this.bookService.getbookData().pipe(
                    map((data) => { return loadBooksSucces({ bookList: data }) }),
                    catchError(() => EMPTY)
                )
            })
        )
    )

    constructor(private actions$: Actions, private bookService: BookService) { }
}