import { Component, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/dashboard/utilities/transactions/Transaction';
import { TransactionsService } from 'src/app/dashboard/utilities/transactions/TransactionsService';
import * as moment from 'moment';
import { TransactionsUtility } from '../utilities/transactions-utility/TransactionsUtility';
import { ActivatedRoute } from '@angular/router';
import { TransactionFilePreviewOverlayRef } from '../transaction_overlay/transaction-file-preview-overlay-ref';
import { TransactionFilePreviewOverlayService } from '../transaction_overlay/transaction-file-preview-overlay.service';

// ngrx
import { Store } from '@ngrx/store';
import { getTransactionBtnColor, getTransactionBtnState, State } from '../state_tran_btn/transaction_btn.reducer';
import * as ToggleBtnActions from '../state_tran_btn/transaction_btn.actions';


import * as TransactionsActions from '../state_transactions/transactions_actions';
import { Observable } from 'rxjs';
import * as TransactionsSelectors from '../state_transactions/transactions_reducer';

@Component({
  selector: 'transactions-component',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{

  errorMessage: string = '';
  filterCategory:string = '';
  filterDate:string = '';
  filterVat:number = 0;
  transactionId:number|null = null;

  // ngrx------------------------------------------ngrx
  transactionsStatus$?:Observable<string>;
  transactions$?: Observable<ITransaction[]>;
  errorMessage$?:Observable<string>;
  btnValue: boolean = false;
  btnColor: string = 'green';
  // ngrx------------------------------------------ngrx
  
  private _filterId:string = '';
  get filterId():string{
    return this._filterId;
  }
  set filterId(value:string){
    this._filterId = value;
    this.filteredTransactions = this.performFilter(value, 'id');
  }
  

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

  constructor(private transactionsService:TransactionsService, 
              private transactionsUtility:TransactionsUtility,
              private TransactionFilePreviewOverlayService: TransactionFilePreviewOverlayService,
              private route:ActivatedRoute,
              // ngrx
              private store: Store<State>) { }

  
  performFilterCategory(filter:string):void{
    this.filterCategory = filter;
    this.filteredTransactions = this.performFilter(filter, 'category');
  }

  
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

  showPreview() {
    let dialogRef: TransactionFilePreviewOverlayRef = this.TransactionFilePreviewOverlayService.open({}, this.transactionId );
  }

  // ngrx------------------------------------------ngrx
  // Version 1
  // changeValue(): void {
  //   this.store.dispatch(
  //     {type:'[Transaction] Toggle Button'}
  //   );
  // };
  // changeColor(): void {
  //   this.store.dispatch(
  //     {type:'[Transaction] Toggle Button Color'}
  //   );
  // };
  // Version 2
  changeValue(): void {
    this.store.dispatch(ToggleBtnActions.toggleBtnState());
  }
  changeColor(): void {
    this.store.dispatch(ToggleBtnActions.toggleBtnColor());
  }

  // ngrx------------------------------------------ngrx
  
  ngOnInit(): void {
  this.transactionsService.getTransactions().subscribe({
      next: transactions =>{
        this.transactions = transactions;
        this.filteredTransactions = this.transactions;
        this.transactionsUtility.calcTotalPrice(this.transactions)
      },
      error: err => this.errorMessage = err
    });
    
  this.route.paramMap.subscribe(
    params => {
        this.transactionId = Number(params.get('id'));
        if(this.transactionId){
          this.showPreview();
        }
    });

// ngrx------------------------------------------ngrx
this.store.dispatch(TransactionsActions.loadTransactions());

this.transactionsStatus$ = this.store.select(TransactionsSelectors.getTransactionsStatus); 
this.transactions$ = this.store.select(TransactionsSelectors.getTransactionsList);
this.errorMessage$ = this.store.select(TransactionsSelectors.getTransactionsListError);

// console.log(this.transactions$)
// -----------------------------------------------------------------------
// Version 1
  // this.store.select('transactionBtn').subscribe(
  //   transaction => {
  //       this.btnValue = transaction.btnState
  //   }
  // )

  // this.store.select('transactionBtn').subscribe(
  //   transaction => {
  //       this.btnColor = transaction.btnColor
  //   }
  // )
// Version 2
  this.store.select(getTransactionBtnState).subscribe(
    transactionBtnState => {
        this.btnValue = transactionBtnState
    }
  )

  this.store.select(getTransactionBtnColor).subscribe(
    transactionBtnColor => {
        this.btnColor = transactionBtnColor
    }
  )
// ngrx------------------------------------------ngrx

  }



}
