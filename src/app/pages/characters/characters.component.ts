import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters:string='/characters'
  constructor() { }

  ngOnInit(): void {
    // this.statusCharacter.unshift({ status: 'Select state', codigo: ''});
    // this.genderCharacter.unshift({ status: 'Select gender', codigo: ''});
  }
  Buscar(obj:any){
    console.log(obj)
  }
}
