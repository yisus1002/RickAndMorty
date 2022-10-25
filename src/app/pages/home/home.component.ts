import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
// import { parse } from 'graphql';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,  DoCheck {
  favoriteCharacter:any;
  constructor(private router:Router) { 
    
  }
  ngDoCheck(): void { 
    this.getData()
  }
  
  ngOnInit(): void {
    this.getData()

  }
  navegar(name: string){
    this.router.navigate([`/${name}`])
  }

  getData(){
    const data =(localStorage.getItem('favoriteCharacter'));

    this.favoriteCharacter=(JSON.parse(data!));
    // console.log(this.favoriteCharacter)
  }
}
