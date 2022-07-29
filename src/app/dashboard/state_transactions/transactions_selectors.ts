import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITransactions } from "./transactions_reducer";

const getTransactions = createFeatureSelector<ITransactions>('transactions');

export const getTransactionsStatus = createSelector(
    getTransactions,
    state => state.status
);

export const getTransactionsList = createSelector(
    getTransactions,
    state => state.transactions
);

export const getTransactionsListError = createSelector(
    getTransactions,
    state => state.error
);