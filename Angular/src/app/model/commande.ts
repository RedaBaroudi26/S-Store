import { IProduct } from "./product";
import { IAccount } from "./account";

export interface ICommande {

    idCommande : number ;
    dateCommande : Date ;
    quantity : number ;
    total : number ; 
    product : IProduct ;
    account : IAccount ;

}