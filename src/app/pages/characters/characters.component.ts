import { CharactersService } from './../../services/characters.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters:string='/characters'
  list:any;
  filtro:any={};
  p: number = 1;
  total:number=0;
  card:boolean=false;
  loading:boolean=false;
  constructor( private _sch:CharactersService) { }

  ngOnInit(): void {
    this.getList() 
  }
  Buscar(obj:any){
    this.filtro=obj
    this.filter(1);
  }
  
  getList() {
    this.loading=true
    this._sch.list().
    pipe(finalize(()=>{
      this.loading=false; 
    })).
    subscribe({
      next:(response:any) => {
        this.card=true;
        this.list = response?.characters;
        // console.log(this.list)
        this.total=this.list?.info?.count
        },
      error:(err:any)=>{
        this.loading=false
      }
    });
  }
  pageChangeEvent(event: number){
    this.p = event;
    (Object.entries(this.filtro).length===0)?this.loadData('','','','',event):this.filter(event);
  }

  loadData(name:string, status:string,type:string, gender:string, page:number){
    this.loading=true;
    this._sch.getCharacter(name,status,type,gender,page).
    pipe(finalize(()=>{
      this.total =this.list?.info?.count;
      this.loading=false;
    })).
    subscribe({
      next: (data:any)=>{
        this.card=true;
        this.list=data
        // console.log(this.list)
      },
      error: (err:any)=>{
        console.log(err?.error?.error)
        this.card=false
        this.loading=false;
      }
    })
  }

  filter(pag:number){
    if(this.filtro?.genderch && !this.filtro?.typ && !this.filtro?.statusch){
      return this.loadData(this.filtro?.name,'','',this.filtro?.genderCharacter,pag)
     }else if(this.filtro?.statusch && !this.filtro?.genderch && !this.filtro?.typ){
       this.loadData(this.filtro?.name,this.filtro?.statusCharacter,'','',pag)
     }else if(this.filtro?.typ && !this.filtro?.genderch && !this.filtro?.statusch){
      return this.loadData(this.filtro?.name,'',this.filtro?.type,'',pag)
     }else if(this.filtro?.genderch && this.filtro?.statusch && !this.filtro?.typ){
      return this.loadData(this.filtro?.name,this.filtro?.statusCharacter,'',this.filtro?.genderCharacter,pag)
     }else if(this.filtro?.genderch && this.filtro?.typ && !this.filtro?.statusch){
      return this.loadData(this.filtro?.name,'',this.filtro?.type,this.filtro?.genderCharacter,pag)
     }else if(this.filtro?.statusch && this.filtro?.typ && !this.filtro?.genderch){
      return this.loadData(this.filtro?.name,this.filtro?.statusCharacter,this.filtro?.type,'',pag)
     }else if(this.filtro?.genderch && this.filtro?.statusch && this.filtro?.typ){
      return this.loadData(this.filtro?.name,this.filtro?.statusCharacter,this.filtro?.type,this.filtro?.genderCharacter,pag)
     }else{
      return this.loadData(this.filtro?.name,'','','',pag)
     }
  }

}
