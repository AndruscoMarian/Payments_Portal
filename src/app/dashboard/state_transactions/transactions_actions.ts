import { createAction, props } from "@ngrx/store";
import { ITransaction } from "../utilities/transactions/Transaction";

export const loadTransactions = createAction(
    '[Transactions] Load'
);

export const loadTransactionsSuccess = createAction(
    '[Transactions] Load Success',
    props< { transactions: ITransaction[] }>()
);

export const loadTransactionsFailure = createAction(
    '[Transactions] Load Failure',
    props< { error: string }>()
);