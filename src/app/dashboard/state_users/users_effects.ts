import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { UsersService } from "../utilities/users/UsersSerice";
import * as UsersActions from './users_actions';


@Injectable()
export class UsersEffects {
    constructor( private actions$: Actions,
                 private usersService: UsersService) {}

        loadUsers$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UsersActions.loadUsers),
                switchMap(() => this.usersService.getUsers().pipe(
                    map(users => UsersActions.loadUsersSuccess({users})),
                )),
                catchError(error => of (UsersActions.loadUsersFailure({error})))
            )
        })

}