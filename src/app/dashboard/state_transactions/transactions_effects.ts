import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionsService } from '../utilities/transactions/TransactionsService';
import * as TransactionsActions from './transactions_actions';


@Injectable()
export class TransactionsEffects {
    constructor( private actions$: Actions,
                 private transactionsService: TransactionsService ) {}
    
    loadTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionsActions.loadTransactions),
            switchMap(() => this.transactionsService.getTransactions().pipe(
                map(transactions => TransactionsActions.loadTransactionsSuccess({transactions})),
                catchError(error => of(TransactionsActions.loadTransactionsFailure({error})))
            ))
        )
    })
}