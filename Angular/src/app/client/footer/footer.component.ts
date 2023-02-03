import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../model/category';
import { CategoryService } from '../../service/category.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit  {

  constructor(private categoryService : CategoryService) { }
  
  categories$ : Observable <ICategory[]> ;
  
  ngOnInit(): void {
   
   this.categories$ = this.categoryService.categories$ ;

  }


}
