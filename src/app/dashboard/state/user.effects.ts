import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UsersService } from "../utilities/users/UsersSerice";
import * as UserActions from './user.action';


@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions,
                private userService: UsersService){}

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() => this.userService.getUsers().pipe(
                map(users => UserActions.loadUsersSuccess({users})),
                catchError(error => of(UserActions.loadUsersFail({error})))
            ))
        )
    })
}