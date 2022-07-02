import { ITransaction } from "../transactions/Transaction";
import { AbstractControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

export class TransactionsUtility {
    performTransactionsFilter(filterBy:string, name:string, transaction:ITransaction):boolean{
        switch(name){
            case 'id':
              return String(transaction.id).includes(filterBy);
            case 'date':
              return transaction.date.toLocaleLowerCase().includes(filterBy);
            case 'category':
              return transaction.category.toLocaleLowerCase().includes(filterBy);
            case 'price':
              return String(transaction.price).includes(filterBy);
            case 'vat':
              return String(transaction.VAT).includes(filterBy);
            case 'totPrice':
              return String(transaction.total_price).includes(filterBy);
            default:
              return true
          }
    }
    performTransactionsSort(byWhat:string, a:ITransaction, b:ITransaction):number{
        switch(byWhat){
            case 'transIdDown':
              if(a.id < b.id){ 
                return -1
              }else if(a.id > b.id){
                return 1
              }else{
                return 0;
              }
            case 'transIdUp':
              if(a.id > b.id){ 
                return -1
              }else if(a.id < b.id){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
            case 'dateDown':
              if(a.date < b.date){ 
                return -1
              }else if(a.date > b.date){
                return 1
              }else{
                return 0;
              }
            case 'dateUp':
              if(a.date > b.date){ 
                return -1
              }else if(a.date < b.date){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
            case 'categoryDown':
              if(a.category < b.category){ 
                return -1
              }else if(a.category > b.category){
                return 1
              }else{
                return 0;
              }
            case 'categoryUp':
              if(a.category > b.category){ 
                return -1
              }else if(a.category < b.category){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
            case 'priceDown':
              if(a.price < b.price){ 
                return -1
              }else if(a.price > b.price){
                return 1
              }else{
                return 0;
              }
            case 'priceUp':
              if(a.price > b.price){ 
                return -1
              }else if(a.price < b.price){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
            case 'vatDown':
              if(a.VAT < b.VAT){ 
                return -1
              }else if(a.VAT > b.VAT){
                return 1
              }else{
                return 0;
              }
            case 'vatUp':
              if(a.VAT > b.VAT){ 
                return -1
              }else if(a.VAT < b.VAT){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
            case 'totalPriceDown':
              if(a.total_price < b.total_price){ 
                return -1
              }else if(a.total_price > b.total_price){
                return 1
              }else{
                return 0;
              }
            case 'totalPriceUp':
              if(a.total_price > b.total_price){ 
                return -1
              }else if(a.total_price < b.total_price){
                return 1
              }else{
                return 0;
              }
              // ----------------------------------------
    
    
            default:
              return 0
            }   
    }
    calcTotalPrice(transaction:ITransaction[]):void{
        transaction.forEach((e)=>{
          if(e.VAT === 10){
            e.total_price = e.price * 1.1
          }else{
            e.total_price = e.price * 1.05
          }
        })   
    }
    performSetMessage(c:AbstractControl | null,message:Record<string,string>,validation:Record<string,string>):void
        {
            c?.valueChanges.pipe(debounceTime(1500)).subscribe(
              value => {
                message.finalMessage = '';
                if((c.touched || c.dirty) && c.errors){
                  message.finalMessage = Object.keys(c.errors).map(
                    key => validation[key]).join(' ');
                }
              } 
            );      
       };
}
