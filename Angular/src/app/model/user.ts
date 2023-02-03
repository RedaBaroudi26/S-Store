import { IAccount } from "./account";

export interface IUser {

    idUser : number ;
    firstName : string ;
    lastName : string ;
    adresse : string ;
    country : string ;
    phone : string ;
    account : IAccount ;

}