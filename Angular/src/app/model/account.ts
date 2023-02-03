import { ICommande } from "./commande";
import { IRole } from "./role";

export interface IAccount {
        
        idAccount : number ;
        email : string ;
        password : string ;
        dateCreation : Date ;
        roles : IRole [] ;
        commandes : ICommande [] ;

}