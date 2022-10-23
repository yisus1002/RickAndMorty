import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterContentInit { 

  @Input() currentRoute :string='';
  @Output() formOutput  :any;
  public forma!         :FormGroup;


  public statusch       :boolean=false;
  public typech         :boolean=false;
  public genderch       :boolean=false;

  public statusCharacter:any[]=[
    { status: 'Alive',   codigo: 'alive'},
    { status: 'Dead',    codigo: 'dead'},
    { status: 'Unknown', codigo: 'unknown'},
  ];
  public genderCharacter:any[]=[
    {gender:'Female',     codigo:'female'},
    {gender:'Male',       codigo:'male'},
    {gender:'Genderless', codigo:'genderless'},
    {gender:'Unknown',    codigo:'unknown'},
  ];


  constructor(
    private form: FormBuilder,
    public router: Router
    ) {
      this.formOutput=new EventEmitter<any>();
   }
  ngAfterContentInit(): void {
    this.createForm();
  }

  ngOnInit(): void { }
  createForm(){
    if(this.currentRoute==='/characters'){
      this.createFormCharacter();
      this.statusCharacter.unshift({
         status: 'Select',   codigo: ''
      });
      this.genderCharacter.unshift({
        gender:'Select', codigo:''
      })
    }else if(this.currentRoute==='/episodes'){
      this.createFormEpisodes();
    }else if(this.currentRoute==='/location'){
      this.createFormLocation();
    }
  }
  createFormCharacter(){
    this.forma= this.form.group({
      name:["",[],[]],
      statusch:[false,[],[]],
      typ:[false,[],[]],
      genderch:[false,[],[]],
      type:["",[],[]],
      statusCharacter:["",[],[]],
      genderCharacter:["",[],[]],
    })
  }
  createFormEpisodes(){
    this.forma= this.form.group({
      name:["",[],[]],
      episode:[false,[],[]],
      episodeEp:[1,[],[]],
    })
  }
  createFormLocation(){
    this.forma= this.form.group({
      name:["",[],[]],
      typ:[false,[],[]],
      dimension:[false,[],[]],
      dimensionLo:['',[],[]],
    })
  }
  filtrar(){
    // console.log(this.forma.value)
    this.formOutput.emit(this.forma.value)
  }

}
