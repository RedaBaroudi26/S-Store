import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryValue : FormGroup = new FormGroup({}) ;
  categoryName : FormControl ;
  idCategory : FormControl ;
  categoryData : any ;
  upCategory : ICategory = {idCategory : null , categoryName : ''} ; 

  constructor(private categoryService : CategoryService ) { }

  ngOnInit(): void {

    this.categoryName = new FormControl('' , Validators.required);
    this.idCategory = new FormControl(null); 
    this.categoryValue=new FormGroup({
      idCategory :  this.idCategory,
      categoryName : this.categoryName
    })

    this.getAllCategory();
  }
  
  postCategoryDatails(value : any){

     let category : ICategory ;
     category = value ;
     
     this.categoryService.addCategory(category)
    .subscribe(res =>{
      console.log(res);
      alert('category added Successfully')
      let ref =document.getElementById('btn2')
      ref ?.click();
      this.categoryValue.reset();
      this.getAllCategory();
    },
    err =>{
      alert('somthing went wrong')
    })
    
  }

    getAllCategory(){
      this.categoryService.getAllCategories()
      .subscribe(res=>{
        this.categoryData = res ;
      })
    }

    deleteCategory(row : ICategory){
      this.categoryService.deleteCategory(row.idCategory)
      .subscribe(res=>{
        alert('category deleted')
        this.getAllCategory();
      })
    }

    updateCategory( ){
      this.categoryService.updateCategory(this.upCategory).subscribe(res =>{
        console.log(res);
        alert('category updated Successfully')
        let ref = document.getElementById('btn3')
        ref?.click();
        this.getAllCategory();
      },
      err =>{
        alert('somthing went wrong')
      })
    }

    
  }
  

