import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable, map,} from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  api:string='https://rickandmortyapi.com/api/character/';
  constructor(private apollo: Apollo,
    public http: HttpClient) { 
  }
  
  list(): Observable<any> {
    return this.apollo.query({
      query: gql`query {
        characters{
          info {
            count,
            pages,
            next
          }
          results {
            id,
            name,
            status,
            species,
            type,
            gender,
            image
          }
        }
      }`
    }).pipe(map((data:any)=>data['data']))
  }
  public getCharacter(name:string, status:string,type:string, gender:string, page:number){
    const url =`${this.api}?name=${name}&status=${status}&type=${type}&gender=${gender}&page=${page}`
  return  this.http.get(url).pipe(map((data:any)=>data))
  }

  public getCharacterId(id:number){
    const url =`${this.api}${id}`
    return this.http.get(url) 
  }

  listCharacterById(chId:number, loId:any, epIds:any[]):Observable<any>{  
    let aux =epIds.toString();
    return this.apollo.query({
      query: gql`query {
        character(id: ${chId}) {
          id,
          name,
          status,
          species,
          type,
          gender,
          image,
          origin{
            name
          }
        }
        location(id:"${loId}"){
          name,
          type,
          dimension,
          id,
        }
        episodesByIds(ids:[${aux}]){
          id,
          name,
          air_date,
          episode
        }
      }`
    }
    ).pipe(map((data:any)=>data['data']))
  }
}
