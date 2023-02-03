import { ICategory } from "./category";
import { IImage } from "./Image";
import { ITva } from "./Tva";

export interface IProduct{

    idProduct : number ; 
    productName : string ;
    price : number ;
    qtStock : number ;
    description : string ;
    category : ICategory ;
    tva : ITva ;
    images : IImage[] ;

}


export interface PageProduct{
    
    content : IProduct[] ;
    number : number ;
    totalElements : number ;
    size : number ;
    totalPages : number ;
     
}
