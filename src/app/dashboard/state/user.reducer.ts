import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as ProductActions from './user.action';
import * as AppState from "../../state/app.state"
import { IUser } from "../utilities/users/User";


export interface State extends AppState.State {
    usersTest: IUserToggleBtn,
    users: IUsers;
}

export interface IUserToggleBtn {
    showUserTestComponent: boolean;
}

export interface IUsers {
    users: IUser[],
    error:string
    // enum Status {
    //     NOT_LOADED,
    //     LOADING,
    //     SUCCESS, 
    //     ERROR
    //     }
}

const initalState: IUserToggleBtn = {
    showUserTestComponent: true,
}

const usersInitalState: IUsers = {
    users: [],
    error: ''
}

// feature selectr function
const getUsersTestFeatureState = createFeatureSelector<IUserToggleBtn>('userTest');

const getLoadUsersFeatureState = createFeatureSelector<IUsers>('users');

export const getShowTestUserComponent = createSelector(
    getUsersTestFeatureState,
    state => state.showUserTestComponent
)

export const getLoadUsers = createSelector(
    getLoadUsersFeatureState,
    state => state.users
)

export const getLoadUsersError = createSelector(
    getLoadUsersFeatureState,
    state => state.error
)

export const userToggleReducer = createReducer<IUserToggleBtn>(
    initalState,
    on(ProductActions.toggleUserComponent, (state): IUserToggleBtn => {
        return {
            ...state,
            showUserTestComponent: !state.showUserTestComponent
        };
    })
);
export const usersReducer = createReducer<IUsers>(
    usersInitalState,
    on(ProductActions.loadUsersSuccess, (state, action): IUsers => {
        return {
            ...state,
            users: action.users,
            error: ''
        }
    }),
    on(ProductActions.loadUsersFail, (state, action): IUsers => {
        return {
            ...state,
            users: [],
            error: action.error
        }
    }),
);