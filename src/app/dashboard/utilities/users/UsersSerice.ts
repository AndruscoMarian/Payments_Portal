import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError, take, map, shareReplay, debounceTime, delay } from "rxjs/operators";
import { Constants } from "src/app/constants/Constants";
import { IUser } from "./User";

@Injectable()

export class UsersService {
    private constants = Constants;
    private usersUrl = `${this.constants.APPURL}users`;

    users$ =  this.http.get<IUser[]>(this.usersUrl)
        .pipe(
            map(users => 
                users.map(user => ({
                    ...user,
                    full_name: `${user.first_name} ${user.last_name}`
                } as IUser))),
            tap(i => console.log('Users: ', JSON.stringify(i))),
            shareReplay(1),
            catchError(this.handleError),
            take(1)
        );

    constructor(private http: HttpClient){}

    getUsers():Observable<IUser[]>{
        return this.http.get<IUser[]>(this.usersUrl)
            .pipe(
                tap(i => console.log('Users: ', JSON.stringify(i))),
                catchError(this.handleError),
                take(1),
                delay(500)
            );
    }

    getUser(id:number|null):Observable<IUser>{
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<IUser>(url).pipe(
            tap(),
            catchError(this.handleError),
            take(1)
        );
    }

    updateUsers(user:IUser):Observable<IUser>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.usersUrl}/${user.id}`;
        return this.http.put<IUser>(url, user, {headers:headers})
        .pipe(
            tap(),
            map(()=> user),
            catchError(this.handleError)
        );
    }

    deleteUser(id:number):Observable<{}>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.usersUrl}/${id}`;
        return this.http.delete<IUser>(url, {headers:headers})
        .pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occurred: ${err.error.message}`;
        }else{
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}

