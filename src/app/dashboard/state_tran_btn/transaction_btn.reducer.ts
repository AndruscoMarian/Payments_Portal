import { ActionReducerMap, createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import * as ToggleBtnActions from './transaction_btn.actions';

// ---------------------------------------Interfaces
export interface State extends AppState.State {
    transactionBtn: ITransactionBtn;
};

export interface ITransactionBtn {
    btnState:  boolean,
    btnColor: string
};

export interface IBtnName {
    btnName:  string,
};
// ---------------------------------------Interfaces
// ---------------------------------------InitialState
const initialBtnState: ITransactionBtn = {
    btnState: true,
    btnColor:'blue'
};
// ---------------------------------------InitialState
// ---------------------------------------Selectors
const getTransactionBtnFeature = createFeatureSelector<ITransactionBtn>('transactionBtn');

export const getTransactionBtnState = createSelector(
    getTransactionBtnFeature,
    state => state.btnState
);

export const getTransactionBtnColor = createSelector(
    getTransactionBtnFeature,
    state => state.btnColor
);
// ---------------------------------------Selectors
// ---------------------------------------Reducer
// export const transactionBtn = createReducer<ITransactionBtn>(
//     initialBtnState,
//     on(createAction('[Transaction] Toggle Button'), (state):ITransactionBtn => {
//         return {
//             ...state,
//             btnState: !state.btnState
//         };
//     }),
//     on(createAction('[Transaction] Toggle Button Color'), (state):ITransactionBtn => {
//         return {
//             ...state,
//             btnColor: 'red'
//         };
//     })
// );



// getTransactions
// getTransactionsSuccess
// getTransactionsError
// createTransactions
// createTransactionsSuccess
// createTransactionsError
// updateTransactions
// updateTransactionsSuccess
// updateTransactionsError
// deleteTransactions
// deleteTransactionsSuccess
// deleteTransactionsError
// transactionsReducer
// getTransactionsListSelector
// getTransactionsStatusSelector
// getTransactionsErrorSelector



export const transactionBtnActions = createReducer<ITransactionBtn>(
    initialBtnState,
    on(ToggleBtnActions.toggleBtnState, (state):ITransactionBtn => {
        return {
            ...state,
            btnState: !state.btnState
        };
    }),
    on(ToggleBtnActions.toggleBtnColor, (state):ITransactionBtn => {
        return {
            ...state,
            btnColor: 'red'
        };
    })
);

// export const transactionBtnreducers: ActionReducerMap<any> = {
//     transactionBtn: transactionBtn,
//     transactionBtnActions: transactionBtnActions
// }
// ---------------------------------------Reducer