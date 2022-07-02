import { IProducts } from "./Products";

export interface ITransaction{

    id:number,
    date:string,
    category:string,
    receiver:string,
    price: number,
    VAT: number,
    total_price: number,
    products:IProducts[]
    
}
