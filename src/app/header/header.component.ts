import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router}  from '@angular/router'
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  configUrl = 'assets/catalog.json';
  config:any;
  category:any;
  constructor(private http : HttpClient , private router : Router) {  
    this.getConfig();       
  }

  ngOnInit() {
  }

  getConfig() {  
    return this.http.get(this.configUrl)
    .subscribe(data => {
        this.config = data['data'].locations;
        console.log('DATA == >',JSON.stringify(this.config))
    });
  }

  selectedCategory(item , index , name) {
    localStorage.branch_id = item;
    localStorage.branchIndex = index;
    localStorage.catName = name;
    this.router.navigateByUrl('home');
    setTimeout(()=>{
      this.router.navigateByUrl('cat');
    },10)
  }

}
