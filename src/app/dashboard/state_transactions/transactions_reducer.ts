import { createReducer, on } from "@ngrx/store";
import * as TransactionsLoad from './transactions_actions'
import { RequestStatus } from "src/app/constants/Constants";

import { ITransaction } from "../utilities/transactions/Transaction";
import * as AppState from '../../state/app.state';

// ---------------------------------------Interfaces
export interface State extends AppState.State {
    Transactions: ITransactions;
};

export interface ITransactions {
    status: string,
    transactions: ITransaction[],
    error: string
}
// ---------------------------------------Interfaces
// ---------------------------------------InitialState
const requestStatus = RequestStatus;

const transactionsInitState: ITransactions = {
    status: requestStatus.NOT_LOADED,
    transactions: [],
    error: ''
}
// ---------------------------------------InitialState
// ---------------------------------------Reducer
export const transactions = createReducer<ITransactions>(
    transactionsInitState,
    on(TransactionsLoad.loadTransactionsSuccess, (state, action): ITransactions => {
        return {
                ...state,
                status:requestStatus.SUCCESS,
                transactions: action.transactions,
                error: ''
        }
    }),
    on(TransactionsLoad.loadTransactionsFailure, (state, action): ITransactions => {
        return{
            ...state,
            status:requestStatus.ERROR,
            transactions: [],
            error: action.error
        }
    })
)
// ---------------------------------------Reducer