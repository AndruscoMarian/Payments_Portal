import { createAction, props } from "@ngrx/store";
import { IUser } from "../utilities/users/User";

export const loadUsers = createAction(
    '[Users] Load',
);

export const loadUsersSuccess = createAction(
    '[Users] Load Success',
    props<{ users: IUser[] }>()
);

export const loadUsersFailure = createAction(
    '[Users] Load Failure',
    props<{ error: string }>()
);