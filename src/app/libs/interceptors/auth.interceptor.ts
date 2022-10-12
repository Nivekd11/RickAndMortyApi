import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/modules/auth/services/api.service';
import SessionHelper from '../helpers/session.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let originalRequest = request
    return next.handle(this.validateIntercept(request)).pipe(
      catchError((error)=>{
        if(error instanceof HttpErrorResponse && error.status === 401){
          return this.expiredHandler(originalRequest,next)
        }
        return throwError(()=>error)
      })
    )
  }

  validateIntercept(request: HttpRequest<unknown>){
    if(request.url.includes("/mirror/")){
      console.log("Intercep")
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer "+SessionHelper.getItem("session").token
        }
      })
      
    }
    return request
  }

  private expiredHandler(originalRequest:HttpRequest<unknown>,next:HttpHandler){
    return this.apiService.refreshToken().pipe(
      switchMap((responseRefresh)=>{
        SessionHelper.setItem("session",responseRefresh)
        originalRequest = originalRequest?.clone({
          setHeaders: {
            Authorization: "Bearer "+SessionHelper.getItem("session").token
          }
        })
        return next.handle(originalRequest)
      })
      
    )
  }


}
