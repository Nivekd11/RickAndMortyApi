import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import SessionHelper from 'src/app/libs/helpers/session.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  login(username:string, password:string){
    let body: any={
      username:username,
      password:password 
    }
    
    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login",body).pipe(
      tap((response)=>{
        SessionHelper.setItem("session",response)
      })
    )
  }

}
