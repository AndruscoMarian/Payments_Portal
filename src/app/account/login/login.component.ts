import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "src/app/dashboard/utilities/transactions/TransactionsService";

@Component({
    selector:'login-component',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{
    errorMessage!:string;

    constructor() { }

    ngOnInit(): void {}

}