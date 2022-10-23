import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  public episodes='/episodes'
  constructor() { }

  ngOnInit(): void {
  }
  buscar(obj:any){
    console.log(obj)
  }
}
