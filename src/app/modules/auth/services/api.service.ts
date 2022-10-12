import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import SessionHelper from 'src/app/libs/helpers/session.helper';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getCharacters(name:string){
    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/rickandmorty",{
      endpoint: "character/?name="+name
    }).pipe(
      map(
        (response:any)=>{
            return response.results.map((item:any)=>{
              return {
                name: item.name,
                img: item.image
              }
            })
        }
      )
    )
  }

  refreshToken(){
    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh",{
      session: SessionHelper.getItem("session")
    })
  }

  
}
