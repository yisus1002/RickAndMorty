import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @Input() items: any;
  @Input() index:number=0;
  @Input() opcionAgregar: boolean=false;
  @Input() opcionEliminar: boolean=false;

  @Output() characterSelec:EventEmitter<number>;
  
  public favorite:any[]=[];

  constructor(private router:Router) { 
    this.characterSelec=new EventEmitter();
    // console.log(this.items)
  }

  ngOnInit(): void {
  }
  
  wathCharact(){
    this.router.navigate(['/character-detalle', this.index])
    console.log(this.index)
  }
  
  deleteCh(){
    console.log(this.index);
    let dataAux:any[]=[];
    const data =(localStorage.getItem('favoriteCharacter'));
    dataAux=(JSON.parse(data!));
   const newDta= dataAux.filter((item)=> item?.id !== this.index)
    console.log(newDta);
    // this.favorite
    localStorage.setItem('favoriteCharacter', JSON.stringify(newDta));

  }
  agregar(){ 
    this.items.id = parseInt(this.items.id) 
    this.obtenerdata(this.items) 
  }
  obtenerdata(item:any){
    this.favorite=[];
    const data =(localStorage.getItem('favoriteCharacter'));
    let aux:any[] =[];
    if(data){
      let aux2:any[]=[];
       aux2 = (JSON.parse(data!))
       console.log(aux2)
       aux2.forEach((ele:any)=>{
         this.favorite.push(ele) 
        }) 
        const found = this.favorite.find(ele=> parseInt(ele?.id) === parseInt(item?.id));
        if(found!=undefined){
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'It is already in your favorites',
            showConfirmButton: false,
            timer: 1500
          }) 
        }else{
          this.favorite.push(item);
          this.saveData(this.favorite); 
        } 
    }else{
      aux.push(item)
      this.saveData(aux)
    }
  }
  
  saveData(item:any){ 
    localStorage.setItem('favoriteCharacter', JSON.stringify(item));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added to your favorites',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
