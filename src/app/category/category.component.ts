import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router}  from '@angular/router'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  configUrl = 'assets/catalog.json';
  config:any;
  category= [];
  catName:any;
  constructor(private http : HttpClient ,private router : Router ) {
    this.getConfig();
    this.catName =  localStorage.catName ;
   }

  ngOnInit() {
  }
  
  getConfig() {  
    return this.http.get(this.configUrl)
    .subscribe(data => {
        let keyTemp = localStorage.branch_id ;        
        this.config = data['data'].locations;  
        let branch_index =  localStorage.branchIndex;
        console.log('config ==> ',JSON.stringify(this.config))    
        let index = this.config.findIndex((item)=>{
          return item.branches[branch_index].branch_id ==keyTemp
        })
        let tempCat= this.config [index].branches;
        for(let item = 0 ; item < tempCat.length ; item++){
            for(let i = 0 ; i < tempCat[item].categories.length ; i++){
              this.category.push({
                catName : tempCat[item].categories[i].name,
                catImage:tempCat[item].categories[i].image
              })
            }
        }
        console.log(' ====> ',JSON.stringify(this.category))  
    });
  }

  navigateDetail(name){
    localStorage.br_catName = name;
    this.router.navigateByUrl('catdetail');
  }
}
