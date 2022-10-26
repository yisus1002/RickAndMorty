import { finalize } from 'rxjs';
import { CharactersService } from './../../services/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-detalle',
  templateUrl: './character-detalle.component.html',
  styleUrls: ['./character-detalle.component.scss']
})
export class CharacterDetalleComponent implements OnInit {
  public character:any;
  public loading:boolean=false;
  public show:boolean=true;
  constructor(private router:Router,
    private activateRoute:ActivatedRoute,
    private  _sCh: CharactersService,
    ) { 
      this.activateRoute.params.subscribe((params:any)=>{
        this.getCharcaterDetall(params['id']);
      })
      
    }

  ngOnInit(): void {
  }
  back(){
    this.router.navigate(['/characters'])

  }
  getCharcaterDetall(id:number){
    this.loading=true;
    this._sCh.getCharacterId(id).subscribe({
      next: (data:any)=>{ 
        let locId = data?.location?.url;
        let epIds:any[] =data?.episode ;
        const eip= epIds.map((data)=>parseInt(data.substring(40,data.length))) ;
        (locId.length===0)? locId="":locId=locId;
        locId= locId.substring(41,locId.length)

        this._sCh.listCharacterById(parseInt(data?.id),parseInt(locId),eip).
        pipe(finalize(()=>{
          this.loading=false;
        }))
        .subscribe({
          next : (data:any)=>{
            this.character=data;
            this.loading=false;
          },
          error:(err:any)=>{
            console.log(err.error.error)
          }
        })
      },
      error: (err:any)=>{
        // console.log(err)
        this.loading=false;
        this.show=false;
        console.log(err.error.error)
      }
    })
  }

}
