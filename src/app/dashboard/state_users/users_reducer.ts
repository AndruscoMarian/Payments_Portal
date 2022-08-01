import { createReducer, on } from "@ngrx/store";
import { RequestStatus } from "src/app/constants/Constants";
import * as UsersActions from './users_actions'

import * as AppState from '../../state/app.state';
import { IUser } from "../utilities/users/User";

// ---------------------------------------Interfaces
export interface State extends AppState.State {
    Users: IUsers;
};

export interface IUsers {
    status: string,
    users: IUser[],
    error: string
}
// ---------------------------------------Interfaces
// ---------------------------------------InitialState
const requestStatus = RequestStatus;

const userssInitState: IUsers = {
    status: requestStatus.NOT_LOADED,
    users: [],
    error: ''
}
// ---------------------------------------InitialState
// ---------------------------------------Reducer
export const users = createReducer<IUsers> (
    userssInitState,
    on(UsersActions.loadUsersSuccess, (state, action): IUsers => {
        return {
            ...state,
            status: requestStatus.SUCCESS,
            users: action.users,
            error: ''
        }
    }),
    on(UsersActions.loadUsersFailure, (state, action): IUsers => {
        return {
            ...state,
            status: requestStatus.ERROR,
            users: [],
            error: action.error
        }
    }),
)
// ---------------------------------------Reducer










