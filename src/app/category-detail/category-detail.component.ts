import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router}  from '@angular/router'

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})

export class CategoryDetailComponent implements OnInit {
  configUrl = 'assets/catalog.json';
  config:any;
  category= [];
  catName:any;
  subCatData = [];
  tempCatName = localStorage.catName;
  tempSubName = localStorage.br_catName;
  constructor(private http : HttpClient , private router : Router ) {
    this.getConfig()
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
        let tempCat= this.config[index].branches;
        console.log('tempCat ==> ',JSON.stringify(tempCat))

        let index1 = tempCat[0].categories.findIndex((item)=>{
          return item.name ==localStorage.br_catName
        })
        let tempSubcatData = tempCat[0].categories[index1]

        for(let i=0 ; i< tempSubcatData.subcategories.length ; i++){
          this.subCatData.push(
            {name:tempSubcatData.subcategories[i].name },
            {image: tempSubcatData.subcategories[i].image}
          )
        }
        console.log('OUTPUT ::: ',JSON.stringify(this.subCatData))
    });
  }

  navigateCategory(){
    this.router.navigateByUrl('cat')
  }

  navigateHome(){
    this.router.navigateByUrl('home')
  }
}
