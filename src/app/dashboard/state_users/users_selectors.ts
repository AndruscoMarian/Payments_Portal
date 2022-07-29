import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUsers } from "./users_reducer";

const getUsers = createFeatureSelector<IUsers>('users');

export const getUsersStatus = createSelector(
    getUsers,
    state => state.status
);

export const getUsersList = createSelector(
    getUsers,
    state => state.users
);

export const getUsersError = createSelector(
    getUsers,
    state => state.error
);




