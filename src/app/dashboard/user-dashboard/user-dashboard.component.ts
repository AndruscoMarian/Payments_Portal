import { Component, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/dashboard/utilities/transactions/Transaction';
import { TransactionsService } from 'src/app/dashboard/utilities/transactions/TransactionsService';
import * as moment from 'moment';
import { TransactionsUtility } from '../utilities/transactions-utility/TransactionsUtility';

@Component({
  selector: 'user-dashboard-component',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  errorMessage: string = '';
  totalIncomes:number = 0;
  totalExpenses:number = 0;
  filterDate:string = '';
  filterVat:number = 0;
  
  
  private _filterPrice:string = '';
  get filterPrice():string{
    return this._filterPrice;
  }
  set filterPrice(value:string){
    this._filterPrice = value;
    this.filteredTransactions = this.performFilter(value, 'price');
  }
  
  private _filterTotalPrice:string = '';
  get filterTotalPrice():string{
    return this._filterTotalPrice;
  }
  set filterTotalPrice(value:string){
    this._filterTotalPrice = value;
    this.filteredTransactions = this.performFilter(value, 'totPrice');
  }

  filteredTransactions:ITransaction[]=[];
  transactions:ITransaction[]=[];

  constructor(private transactionsService:TransactionsService, private transactionsUtility:TransactionsUtility) { }

  performFilterDate(filter:string):void{
    this.filterDate = moment(filter).format('MM[.]DD[.]YYYY');
    this.filteredTransactions = this.performFilter(this.filterDate, 'date');
  }

  performFilterVat(filter:number):void{
    this.filterVat = filter;
    this.filteredTransactions = this.performFilter(String(filter), 'vat');
  }

  performFilter(filterBy:string, name:string):ITransaction[]{
    return this.transactions.filter((transaction:ITransaction) =>{
      return this.transactionsUtility.performTransactionsFilter(filterBy, name, transaction);
    });
  }

  performSortTransactions(param:string):void{
    const sortedTransactions = this.performSort(param);
    this.filteredTransactions = sortedTransactions;
  }
  
  performSort(byWhat: string):ITransaction[]{ 
    return this.transactions.sort((a:ITransaction, b:ITransaction)=>{
      return this.transactionsUtility.performTransactionsSort(byWhat, a, b);
   })
  }

  performTotal():any{
    this.transactions.forEach((e)=>{
      if(e.category === 'expenses'){
        this.totalExpenses += e.price
      }else{
        this.totalIncomes += e.price
      }
    })

  }  

  ngOnInit(): void {
      this.transactionsService.getTransactions().subscribe({
      next: transactions =>{
        this.transactions = transactions;
        this.filteredTransactions = this.transactions;
        // this.performTotal()
        this.transactionsUtility.calcTotalPrice(this.transactions)
      },
      error: err => this.errorMessage = err
    });
  }
}


