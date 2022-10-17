import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, delay, map, take, tap } from "rxjs/operators";
import { Constants } from "src/app/constants/Constants";
import { ITransaction } from "./Transaction";


@Injectable()
export class TransactionsService {
 
    private constants = Constants;
    private transactionsUrl = `${this.constants.APPURL}transactions`;

    constructor(private http: HttpClient){}
    

    getTransactions():Observable<ITransaction[]>{
        return this.http.get<ITransaction[]>(this.transactionsUrl).pipe(
            tap(data => console.log('Transactions: ', JSON.stringify(data))),
            catchError(this.handleError),
            take(1),
            delay(500)
        );
    }

    getTransaction(id:number|null):Observable<ITransaction>{
        const url = `${this.transactionsUrl}/${id}`;
        return this.http.get<ITransaction>(url).pipe(
            tap(),
            catchError(this.handleError),
            take(1)
        )
    }

    updateTransaction(transaction:ITransaction):Observable<ITransaction>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.transactionsUrl}/${transaction.id}`;
        return this.http.put<ITransaction>(url, transaction, {headers:headers})
        .pipe(
            tap(),
            map(()=> transaction),
            catchError(this.handleError)
        );
    }

    deleteTransaction(id:number):Observable<{}>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.transactionsUrl}/${id}`;
        return this.http.delete<ITransaction>(url, {headers:headers})
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

