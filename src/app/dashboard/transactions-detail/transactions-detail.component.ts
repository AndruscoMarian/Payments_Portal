import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from '../utilities/transactions/Transaction';
import { TransactionsService } from '../utilities/transactions/TransactionsService';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TransactionsUtility } from '../utilities/transactions-utility/TransactionsUtility';
import { TransactionFilePreviewOverlayRef } from '../transaction_overlay/transaction-file-preview-overlay-ref';

@Component({
  selector: 'transactions-detail-component',
  templateUrl: './transactions-detail.component.html',
  styleUrls: ['./transactions-detail.component.css']
})
export class TransactionsDetailComponent implements OnInit {

  transactionForm!: FormGroup;  
  errorMessage: string = '';
  transaction!:ITransaction;
  @Input() transactionID!:number|null;

// ------------------Start Set message------------
    // id:number,
    // date:string,
    // category:string,
    // receiver:string,
    // price: number,
    // VAT: number,
    // total_price: number,
    // products:IProducts[]
message = {
  idMessage: {finalMessage:''},
  dateMessage: {finalMessage:''},
  priceMessage: {finalMessage:''},
  VATMessage: {finalMessage:''},
  totalPriceMessage: {finalMessage:''},
  productDescription: {finalMessage:''},
  pieces: {finalMessage:''},
  productPrice: {finalMessage:''},
};

private validation = {
  idValidation: {
    required:'The ID is required',
  },
  dateValidation: {
    required:'The date is required',
  },
  priceValidation: {
    required:'The price is required',
    minlength:'The value must have at least two characters'
  },
  VATValidation: {
    required:'The VAT is required',
  },
  totalPriceValidation: {
    required:'The total price is required',
  }
};
// ------------------End Set message------------

  constructor(private transactionsService:TransactionsService,
              private fb:FormBuilder,
              private transactionsUtility:TransactionsUtility,
              private transactionFilePreviewOverlayRef:TransactionFilePreviewOverlayRef
    ) { }

  ngOnInit(): void {

    this.transactionForm = this.fb.group({
      id:[
        {value: "", disabled:true},
        [Validators.required]
      ],
      date:[
        {value: "", disabled:true},
        [Validators.required]
      ],
      price:[
        {value: "", disabled:false},
        [Validators.required, Validators.minLength(2)]
      ],
      VAT:[
        {value: "", disabled:true},
        [Validators.required]
      ],
      total_price:[
        {value: "", disabled:true},
        [Validators.required]
      ],
    });

    this.transactionsService.getTransaction(this.transactionID).subscribe({
      next: (transaction:ITransaction) => {
      this.transaction = transaction;
      this.setTransactionFormValues(transaction);
      this.setTransactionFormMessages();
      },
      error: err => this.errorMessage = err
    })
  }

  saveTransaction():void{
    if(this.transactionForm.value){
      const transaction = {...this.transaction, ...this.transactionForm.value};
      this.transactionsService.updateTransaction(transaction).subscribe({
        next:()=>this.onSaveComplete(),
        error: err => this.errorMessage = err,
      });
      this.showPreview();
    }else{
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  deleteTransaction():void{
    if(confirm(`Really delete this transaction: ${this.transaction.id}?`)){
      this.transactionsService.deleteTransaction(this.transaction.id).subscribe({
        next: ()=> this.onSaveComplete(),
        error: err => this.errorMessage = err,
      });
      this.showPreview();
    }
  }

  onSaveComplete():void{
    this.transactionForm.reset();
  };

  setTransactionFormValues(transaction:ITransaction):void{
    const {id, date, price, VAT, total_price} = transaction;
    this.transactionForm.get('id')?.setValue(id);
    this.transactionForm.get('date')?.setValue(date);
    this.transactionForm.get('price')?.setValue(price);
    this.transactionForm.get('VAT')?.setValue(VAT);
    this.transactionForm.get('total_price')?.setValue(total_price);
  }

  setTransactionFormMessages():void{
    this.transactionsUtility.performSetMessage(this.transactionForm.get('price'),this.message.priceMessage,this.validation.priceValidation);
  }

  showPreview():void {
    this.transactionFilePreviewOverlayRef.close();
  }

}
