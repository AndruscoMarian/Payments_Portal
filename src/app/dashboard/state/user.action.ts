import { createAction, props } from "@ngrx/store";
import { IUser } from "../utilities/users/User";

export const toggleUserComponent = createAction(
    '[User] Toggle User Component'
);


export const loadUsers = createAction(
    '[User] User Load'
);

export const loadUsersSuccess = createAction(
    '[User] User Load Success',
    props<{users: IUser[]}>()
);

export const loadUsersFail = createAction(
    '[User] User Load Fail',
    props<{error: string}>()
);